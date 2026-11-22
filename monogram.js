(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.max(0, Math.min(1, value));
  const scenes = ['.monogram-anchor', '.contact-form-scene'].map(selector => {
    const element = document.querySelector(selector);
    return element && { element, lines: [...element.querySelectorAll('[data-monogram-line]')], start: 0, end: 1 };
  }).filter(Boolean);
  let framePending = false;
  function update() {
    framePending = false;
    scenes.forEach(scene => {
      const progress = preference.matches ? 1 : clamp((window.scrollY - scene.start) / (scene.end - scene.start));
      const strokes = [clamp(progress / .5), clamp((progress - .3) / .55), clamp((progress - .8) / .2)];
      scene.lines.forEach((line, index) => {
        const offset = (1 - strokes[index]).toFixed(4);
        if (line.style.strokeDashoffset !== offset) line.style.strokeDashoffset = offset;
      });
    });
  }
  function schedule() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(update);
  }
  function measure() {
    const height = window.innerHeight;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - height);
    scenes.forEach(scene => {
      const top = scene.element.getBoundingClientRect().top + window.scrollY;
      scene.end = Math.max(1, Math.min(maxScroll, top - height * .3));
      scene.start = Math.max(0, Math.min(scene.end - 1, top - height * .9));
    });
    schedule();
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  preference.addEventListener('change', schedule);
  const observer = new ResizeObserver(measure);
  observer.observe(document.querySelector('main'));
  scenes.forEach(scene => observer.observe(scene.element));
  document.fonts?.ready.then(measure);
  measure();
})();
