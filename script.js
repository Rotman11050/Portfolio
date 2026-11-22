const toggle = document.querySelector(".menu-toggle");
const contactReturnUrl = new URL(window.location.href);
if (contactReturnUrl.searchParams.get('message') === 'sent') {
  document.querySelector('#contact-thank-you').hidden = false;
  contactReturnUrl.searchParams.delete('message');
  history.replaceState(history.state, '', contactReturnUrl.pathname + contactReturnUrl.search + contactReturnUrl.hash);
}
const cvPreviewLink = document.querySelector('#preview-cv');
const cvPreview = document.querySelector('#cv-preview');
let cvPreviousOverflow = '';
cvPreviewLink.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof cvPreview.showModal !== 'function') return;
  event.preventDefault();
  const documentFrame = cvPreview.querySelector('.cv-preview-document img');
  if (!documentFrame.hasAttribute('src')) documentFrame.src = documentFrame.dataset.src;
  cvPreviousOverflow = document.documentElement.style.overflow;
  cvPreview.showModal();
  cvPreview.querySelector('.cv-preview-document').scrollTop = 0;
  document.documentElement.style.overflow = 'hidden';
});
cvPreview.querySelector('.cv-preview-close').addEventListener('click', () => cvPreview.close());
cvPreview.querySelector('.cv-preview-zoom').addEventListener('click', event => {
  const zoomed = cvPreview.querySelector('.cv-preview-document').classList.toggle('is-zoomed');
  event.currentTarget.textContent = zoomed ? 'Fit to width' : 'Zoom in';
  event.currentTarget.setAttribute('aria-pressed', String(zoomed));
});
cvPreview.addEventListener('click', event => {
  const rect = cvPreview.getBoundingClientRect();
  if (event.target === cvPreview && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) cvPreview.close();
});
cvPreview.addEventListener('close', () => {
  document.documentElement.style.overflow = cvPreviousOverflow;
  cvPreviewLink.focus({ preventScroll: true });
});
const nav = document.querySelector(".nav");
function closeNavigation() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeNavigation();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeNavigation();
});
toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();

const portraitSection = document.querySelector('.portrait-section');
const signature = document.querySelector('.signature');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const portraitStage = portraitSection.querySelector('.stage');
const signatureFirst = signature.querySelector('.signature-first');
const signatureLast = signature.querySelector('.signature-last');
const signatureFlourish = signature.querySelector('.signature-flourish');
const portraitBubbles = [
  { element: portraitStage.querySelector('.tag-apex'), start: -90, end: -135, mobileStart: -90, mobileEnd: -118 },
  { element: portraitStage.querySelector('.tag-bottom'), start: 150, end: 125, mobileStart: 200, mobileEnd: 180 },
  { element: portraitStage.querySelector('.tag-right'), start: 30, end: -5, mobileStart: 30, mobileEnd: -5 }
];
let compactPortrait = window.innerWidth <= 650;
let framePending = false;
let fontReady = false;
let sectionTop = 0;
let scrollDistance = 1;
let signatureHoldDistance = 0;
const clamp = value => Math.min(1, Math.max(0, value));
function setStyle(element, property, value) {
  if (property.startsWith('--')) {
    if (element.style.getPropertyValue(property) !== value) element.style.setProperty(property, value);
    return;
  }
  if (element.style[property] !== value) element.style[property] = value;
}
function measurePortrait() {
  compactPortrait = window.innerWidth <= 650;
  sectionTop = portraitSection.getBoundingClientRect().top + window.scrollY;
  scrollDistance = Math.max(1, portraitSection.offsetHeight - portraitStage.offsetHeight);
  // The added 20svh is a reading pause, rather than slower handwriting.
  signatureHoldDistance = motionPreference.matches ? 0 : portraitSection.offsetHeight * (20 / 280);
  scheduleUpdate();
}
function revealLine(line, progress) {
  const offset = ((1 - progress) * 100).toFixed(3);
  setStyle(line, 'transform', 'translate3d(-' + offset + '%,0,0)');
  setStyle(line.firstElementChild, 'transform', 'translate3d(' + offset + '%,0,0)');
}
function updatePortrait() {
  // Reuse cached geometry to keep scrolling lightweight.
  const travelled = Math.max(0, window.scrollY - sectionTop);
  const animationDistance = Math.max(1, scrollDistance - signatureHoldDistance);
  const holdStart = animationDistance * .52;
  const heldDistance = Math.min(signatureHoldDistance, Math.max(0, travelled - holdStart));
  const scrollProgress = clamp((travelled - heldDistance) / animationDistance);
  const sceneProgress = motionPreference.matches ? 0 : clamp((scrollProgress - 0.65) / 0.35);
  const sceneValue = sceneProgress.toFixed(4);
  if (portraitSection.style.getPropertyValue('--progress') !== sceneValue) {
    portraitSection.style.setProperty('--progress', sceneValue);
  }
  portraitSection.classList.toggle('is-transitioning', sceneProgress > 0 && sceneProgress < 1);
  // Clear the signature as it writes, then hold these positions during zoom-out.
  const orbitProgress = motionPreference.matches ? 1 : clamp((scrollProgress - .02) / .46);
  const orbitEase = orbitProgress * orbitProgress * (3 - 2 * orbitProgress);
  portraitBubbles.forEach(bubble => {
    const start = compactPortrait ? bubble.mobileStart : bubble.start;
    const end = compactPortrait ? bubble.mobileEnd : bubble.end;
    const angle = (start + (end - start) * orbitEase) * Math.PI / 180;
    setStyle(bubble.element, '--bubble-cos', Math.cos(angle).toFixed(6));
    setStyle(bubble.element, '--bubble-sin', Math.sin(angle).toFixed(6));
  });
  revealLine(signatureFirst, clamp((scrollProgress - 0.02) / 0.16));
  revealLine(signatureLast, clamp((scrollProgress - 0.18) / 0.22));
  setStyle(signatureFlourish, 'strokeDashoffset', (1 - clamp((scrollProgress - 0.40) / 0.08)).toFixed(4));
  const signatureVisible = fontReady && scrollProgress > 0.02;
  signature.classList.toggle('is-writing', signatureVisible);
  portraitSection.classList.toggle('signature-started', signatureVisible);
  framePending = false;
}
function scheduleUpdate() {
  if (!framePending) { framePending = true; requestAnimationFrame(updatePortrait); }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', measurePortrait, { passive: true });
motionPreference.addEventListener('change', scheduleUpdate);
new ResizeObserver(measurePortrait).observe(portraitStage);
new ResizeObserver(measurePortrait).observe(portraitSection);
document.querySelector('#replay')?.addEventListener('click', () => {
  window.scrollTo({ top:sectionTop, behavior:motionPreference.matches ? 'instant' : 'smooth' });
});
// Wait only for the signature font; an unrelated webfont must not delay its appearance.
const signatureFont = document.fonts ? document.fonts.load('126px Allura', 'Miloš Karapandžić') : Promise.resolve();
signatureFont.catch(() => {}).then(() => { fontReady = true; scheduleUpdate(); });
measurePortrait();
updatePortrait();

// Accessible focus tabs: mouse/touch selection and standard arrow-key navigation.
const aboutTabs = [...document.querySelectorAll('.about-tab')];
function selectAboutTab(selectedTab) {
  aboutTabs.forEach(tab => {
    const selected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  });
}
aboutTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectAboutTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % aboutTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + aboutTabs.length) % aboutTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = aboutTabs.length - 1;
    else return;
    event.preventDefault();
    selectAboutTab(aboutTabs[nextIndex]);
    aboutTabs[nextIndex].focus();
  });
});

// The page scroll drives horizontal movement while the timeline remains sticky.
const experienceTrack = document.querySelector('#experience-track');
const timelineSection = document.querySelector('.experience-timeline');
const timelineScene = timelineSection.querySelector('.timeline-scene');
let timelineStart = 0;
let timelineTravel = 0;
let timelinePinned = false;
let timelineFrame = false;
const timelineHold = 80;
function updateTimeline() {
  if (timelinePinned) {
    const distance = Math.min(timelineTravel, Math.max(0, window.scrollY - timelineStart - timelineHold));
    experienceTrack.scrollLeft = distance;
  }
  timelineFrame = false;
}
function scheduleTimeline() {
  if (!timelineFrame) {
    timelineFrame = true;
    requestAnimationFrame(updateTimeline);
  }
}
function measureTimeline() {
  timelineTravel = Math.max(0, experienceTrack.scrollWidth - experienceTrack.clientWidth);
  const sceneHeight = timelineScene.offsetHeight;
  timelinePinned = !motionPreference.matches && timelineTravel > 0 && sceneHeight <= window.innerHeight;
  timelineSection.classList.toggle('is-pinned', timelinePinned);
  timelineSection.style.setProperty('--timeline-height', (sceneHeight + timelineTravel + timelineHold * 2) + 'px');
  timelineStart = timelineSection.getBoundingClientRect().top + window.scrollY;
  scheduleTimeline();
}
window.addEventListener('scroll', scheduleTimeline, { passive: true });
window.addEventListener('resize', measureTimeline, { passive: true });
motionPreference.addEventListener('change', measureTimeline);
const timelineResize = new ResizeObserver(measureTimeline);
timelineResize.observe(timelineScene);
timelineResize.observe(document.querySelector('.about-layout'));
timelineResize.observe(document.querySelector('.experience-overview'));
function showExperience(hash, behavior = motionPreference.matches ? 'instant' : 'smooth') {
  const item = Array.from(experienceTrack.querySelectorAll('.timeline-item[id]')).find(item => '#' + item.id === hash);
  if (!item) return;
  measureTimeline();
  const destination = Math.max(0, Math.min(timelineTravel,
    item.getBoundingClientRect().left - experienceTrack.getBoundingClientRect().left + experienceTrack.scrollLeft));
  item.focus({ preventScroll: true });
  if (timelinePinned) {
    window.scrollTo({ top: timelineStart + timelineHold + destination, behavior });
  } else {
    experienceTrack.scrollTo({ left: destination, behavior });
    window.scrollTo({ top: timelineStart, behavior });
  }
}
document.querySelectorAll('.experience-selected a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const hash = link.getAttribute('href');
    history.pushState(null, '', hash);
    showExperience(hash);
  });
});
window.addEventListener('hashchange', () => showExperience(location.hash));
document.fonts?.ready.then(() => showExperience(location.hash, 'instant'));
experienceTrack.addEventListener('keydown', event => {
  if (event.target !== experienceTrack && !event.target.matches('.timeline-item[tabindex]')) return;
  const firstItem = experienceTrack.querySelector('.timeline-item');
  const gap = parseFloat(getComputedStyle(firstItem.parentElement).columnGap) || 0;
  const step = firstItem.getBoundingClientRect().width + gap;
  let destination;
  if (event.key === 'ArrowLeft') destination = experienceTrack.scrollLeft - step;
  else if (event.key === 'ArrowRight') destination = experienceTrack.scrollLeft + step;
  else if (event.key === 'Home') destination = 0;
  else if (event.key === 'End') destination = timelineTravel;
  else return;
  event.preventDefault();
  destination = Math.max(0, Math.min(timelineTravel, destination));
  const behavior = motionPreference.matches ? 'instant' : 'smooth';
  if (timelinePinned) window.scrollTo({ top: timelineStart + timelineHold + destination, behavior });
  else experienceTrack.scrollTo({ left: destination, behavior });
});
document.fonts?.ready.then(measureTimeline);
measureTimeline();

const copyEmailButton = document.querySelector('#copy-contact-email');
const copyEmailStatus = document.querySelector('#contact-copy-status');
copyEmailButton.addEventListener('click', async () => {
  const emailAddress = copyEmailButton.dataset.email;
  try {
    await navigator.clipboard.writeText(emailAddress);
    copyEmailStatus.textContent = 'Email address copied.';
  } catch {
    copyEmailStatus.textContent = emailAddress;
    const range = document.createRange();
    range.selectNodeContents(copyEmailStatus);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
