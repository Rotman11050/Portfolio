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
let framePending = false;
let fontReady = false;
const clamp = value => Math.min(1, Math.max(0, value));
function updatePortrait() {
  const bounds = portraitSection.getBoundingClientRect();
  const stage = portraitSection.querySelector('.stage');
  const distance = Math.max(1, portraitSection.offsetHeight - stage.offsetHeight);
  const scrollProgress = clamp(-bounds.top / distance);
  // Write the name, hold it fully visible, then shrink the portrait before leaving.
  const sceneProgress = motionPreference.matches ? 0 : clamp((scrollProgress - 0.65) / 0.35);
  const styles = document.documentElement.style;
  styles.setProperty('--progress', sceneProgress.toFixed(4));
  styles.setProperty('--signature-first', clamp((scrollProgress - 0.02) / 0.16).toFixed(4));
  styles.setProperty('--signature-last', clamp((scrollProgress - 0.18) / 0.22).toFixed(4));
  styles.setProperty('--signature-underline', clamp((scrollProgress - 0.40) / 0.08).toFixed(4));
  const signatureVisible = fontReady && scrollProgress > 0.02;
  signature.classList.toggle('is-writing', signatureVisible);
  portraitSection.classList.toggle('signature-started', signatureVisible);
  framePending = false;
}
function scheduleUpdate() {
  if (!framePending) { framePending = true; requestAnimationFrame(updatePortrait); }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
motionPreference.addEventListener('change', scheduleUpdate);
document.querySelector('#replay')?.addEventListener('click', () => {
  window.scrollTo({ top:window.scrollY + portraitSection.getBoundingClientRect().top, behavior:motionPreference.matches ? 'instant' : 'smooth' });
});
document.fonts.ready.then(() => { fontReady = true; scheduleUpdate(); });
updatePortrait();

const textMotionToggle = document.querySelector('#toggle-text-motion');
textMotionToggle.addEventListener('click', () => {
  const paused = document.querySelector('.backdrop-type').classList.toggle('is-paused');
  textMotionToggle.setAttribute('aria-pressed', String(paused));
  textMotionToggle.textContent = paused ? 'Play text' : 'Pause text';
});
