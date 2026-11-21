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
  // Geometry is measured on resize, not after the orbit has written styles each frame.
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
  portraitSection.classList.toggle('motion-paused', paused);
  syncHaloAnimation();
  textMotionToggle.setAttribute('aria-pressed', String(paused));
  textMotionToggle.textContent = paused ? 'Play motion' : 'Pause motion';
});

// Front: right ear -> forehead -> left ear. Rear: recede behind the portrait.
const orbitPortrait = document.querySelector('.portrait-wrap');
const orbitBubbles = [...document.querySelectorAll('.language-bubble')];
let orbitWidth = orbitPortrait.clientWidth;
let orbitHeight = orbitPortrait.clientHeight;
let orbitElapsed = 0;
let orbitLastTime = null;
let orbitFrame = null;
let orbitInView = true;
function paintHalo() {
  const radiusX = Math.max(orbitWidth * 0.29, orbitHeight * 0.30);
  const radiusY = orbitHeight * 0.145;
  orbitBubbles.forEach((bubble, index) => {
    const angle = orbitElapsed / 36000 * Math.PI * 2 + index / orbitBubbles.length * Math.PI * 2;
    const depth = Math.sin(angle);
    const x = radiusX * Math.cos(angle);
    const y = -radiusY * depth;
    const scale = depth >= 0 ? 0.82 + depth * 0.28 : 0.82 + depth * 0.14;
    const opacity = depth >= 0 ? 1 : Math.max(0, 1 + depth * 3);
    setStyle(bubble, 'opacity', opacity.toFixed(3));
    setStyle(bubble, 'zIndex', depth >= 0 ? '3' : '0');
    // Invisible bubbles need no transform updates until they approach an ear again.
    if (opacity === 0) return;
    setStyle(bubble, 'transform', 'translate(-50%, -50%) translate(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px) scale(' + scale.toFixed(3) + ')');
  });
}
function orbitTick(time) {
  if (orbitLastTime !== null) orbitElapsed += Math.min(64, time - orbitLastTime);
  orbitLastTime = time;
  paintHalo();
  orbitFrame = requestAnimationFrame(orbitTick);
}
function syncHaloAnimation() {
  const shouldRun = orbitInView && !document.hidden && !motionPreference.matches && !portraitSection.classList.contains('motion-paused');
  if (shouldRun && orbitFrame === null) {
    orbitLastTime = null;
    orbitFrame = requestAnimationFrame(orbitTick);
  } else if (!shouldRun && orbitFrame !== null) {
    cancelAnimationFrame(orbitFrame);
    orbitFrame = null;
    orbitLastTime = null;
  }
}
new ResizeObserver(() => {
  orbitWidth = orbitPortrait.clientWidth;
  orbitHeight = orbitPortrait.clientHeight;
  paintHalo();
}).observe(orbitPortrait);
new IntersectionObserver(entries => {
  orbitInView = entries[0].isIntersecting;
  syncHaloAnimation();
}).observe(portraitSection);
document.addEventListener('visibilitychange', syncHaloAnimation);
motionPreference.addEventListener('change', syncHaloAnimation);
paintHalo();
syncHaloAnimation();
