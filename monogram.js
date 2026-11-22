(() => {
  const anchor = document.querySelector('.monogram-anchor');
  const mark = anchor.querySelector('.monogram-flight');
  const form = document.querySelector('.contact-form');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const viewport = document.createElement('div');
  viewport.className = 'monogram-viewport';
  viewport.setAttribute('aria-hidden', 'true');
  document.querySelector('main').append(viewport);
  const lines = [...mark.querySelectorAll('[data-monogram-line]')];
  let route = [];
  let origin;
  let destination;
  let framePending = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  const documentRect = element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + window.scrollY + rect.height / 2, top: rect.top + window.scrollY, width: rect.width, height: rect.height };
  };
  function draw(progress) {
    const values = [clamp(progress / .5), clamp((progress - .35) / .5), clamp((progress - .8) / .2)];
    lines.forEach((line, index) => {
      line.style.strokeDasharray = '1';
      line.style.strokeDashoffset = (1 - values[index]).toFixed(4);
    });
  }
  function measure() {
    if (preference.matches) {
      anchor.append(mark);
      mark.style.visibility = 'visible';
      mark.style.transform = '';
      mark.style.opacity = '1';
      draw(1);
      return;
    }
    if (mark.parentElement !== viewport) viewport.append(mark);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const anchorRect = documentRect(anchor);
    const formRect = documentRect(form);
    origin = { x: anchorRect.x, y: anchorRect.y, size: Math.min(760, anchorRect.width * 1.18) };
    destination = { x: formRect.x + formRect.width * .02, y: formRect.y + formRect.height * .16, size: Math.min(1440, formRect.width * 2.3, width * 1.7) };
    const launch = origin.y - height * .5;
    const landing = formRect.top - height * .18;
    const timeline = documentRect(document.querySelector('.experience-timeline'));
    const projects = documentRect(document.querySelector('#projects'));
    const skills = documentRect(document.querySelector('#skills'));
    route = [
      { scroll: launch, x: origin.x, y: height * .5, size: origin.size, rx: -9, ry: -15, rz: -7 },
      { scroll: Math.max(launch + 1, timeline.top + timeline.height * .28), x: width * .93, y: height * .65, size: Math.min(440, width * .65), rx: 12, ry: 48, rz: 12 },
      { scroll: projects.top - height * .2, x: width * .08, y: height * .58, size: Math.min(500, width * .75), rx: -12, ry: -35, rz: -15 },
      { scroll: skills.top - height * .35, x: width * .85, y: height * .6, size: Math.min(600, width), rx: 8, ry: 30, rz: 10 },
      { scroll: landing, x: destination.x, y: destination.y - landing, size: destination.size, rx: 0, ry: -8, rz: -10 }
    ].sort((a, b) => a.scroll - b.scroll);
    schedule();
  }
  function update() {
    framePending = false;
    if (preference.matches || !origin) return;
    const scroll = window.scrollY;
    const first = route[0];
    const last = route[route.length - 1];
    let pose;
    if (scroll <= first.scroll) pose = { ...first, y: origin.y - scroll };
    else if (scroll >= last.scroll) pose = { ...last, y: destination.y - scroll };
    else {
      const endIndex = route.findIndex(point => point.scroll >= scroll);
      const a = route[endIndex - 1];
      const b = route[endIndex];
      const progress = smooth(clamp((scroll - a.scroll) / Math.max(1, b.scroll - a.scroll)));
      pose = {};
      ['x', 'y', 'size', 'rx', 'ry', 'rz'].forEach(key => { pose[key] = mix(a[key], b[key], progress); });
    }
    const height = pose.size * 360 / 620;
    const visible = pose.y + height / 2 > 0 && pose.y - height / 2 < window.innerHeight;
    mark.style.visibility = visible ? 'visible' : 'hidden';
    if (!visible) return;
    mark.style.transform = `translate3d(${(pose.x - 310).toFixed(2)}px,${(pose.y - 180).toFixed(2)}px,0) perspective(1100px) rotateX(${pose.rx.toFixed(2)}deg) rotateY(${pose.ry.toFixed(2)}deg) rotateZ(${pose.rz.toFixed(2)}deg) scale(${(pose.size / 620).toFixed(4)})`;
    draw(clamp((scroll - (origin.y - window.innerHeight * .9)) / (window.innerHeight * .35)));
  }
  function schedule() {
    if (!framePending) { framePending = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  preference.addEventListener('change', measure);
  const observer = new ResizeObserver(measure);
  [anchor, form, document.querySelector('main')].forEach(element => observer.observe(element));
  document.fonts?.ready.then(measure);
  measure();
})();
