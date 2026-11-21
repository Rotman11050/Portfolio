const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
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
let framePending = false;
let fontReady = false;
let sectionTop = 0;
let scrollDistance = 1;
const clamp = value => Math.min(1, Math.max(0, value));
function setStyle(element, property, value) {
  if (element.style[property] !== value) element.style[property] = value;
}
function measurePortrait() {
  sectionTop = portraitSection.getBoundingClientRect().top + window.scrollY;
  scrollDistance = Math.max(1, portraitSection.offsetHeight - portraitStage.offsetHeight);
  scheduleUpdate();
}
function revealLine(line, progress) {
  const offset = ((1 - progress) * 100).toFixed(3);
  setStyle(line, 'transform', 'translate3d(-' + offset + '%,0,0)');
  setStyle(line.firstElementChild, 'transform', 'translate3d(' + offset + '%,0,0)');
}
function updatePortrait() {
  // Reuse cached geometry to keep scrolling lightweight.
  const scrollProgress = clamp((window.scrollY - sectionTop) / scrollDistance);
  const sceneProgress = motionPreference.matches ? 0 : clamp((scrollProgress - 0.65) / 0.35);
  const sceneValue = sceneProgress.toFixed(4);
  if (portraitSection.style.getPropertyValue('--progress') !== sceneValue) {
    portraitSection.style.setProperty('--progress', sceneValue);
  }
  portraitSection.classList.toggle('is-transitioning', sceneProgress > 0 && sceneProgress < 1);
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

const textMotionToggle = document.querySelector('#toggle-text-motion');
textMotionToggle.addEventListener('click', () => {
  const paused = document.querySelector('.backdrop-type').classList.toggle('is-paused');
  textMotionToggle.setAttribute('aria-pressed', String(paused));
  textMotionToggle.textContent = paused ? 'Play text' : 'Pause text';
});
