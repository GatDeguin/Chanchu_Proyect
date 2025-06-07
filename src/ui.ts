
// ui.ts – common UI helpers
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const html = document.documentElement;
const setDark = (val: boolean) => html.classList.toggle('dark', val);

setDark(prefersDark.matches);
prefersDark.addEventListener('change', e => setDark(e.matches));

// Back‑to‑top button
const btn = document.getElementById('back-to-top');
if (btn) {
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate(self) {
      btn!.classList.toggle('opacity-0', self.progress < 0.1);
    }
  });
}

// CountUp stats
import('countup.js').then(({ CountUp }) => {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    const val = Number(el.dataset.count);
    const counter = new CountUp(el, val, { duration: 2 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => counter.start()
    });
  });
});

/* Modal accessibility (focus trap & ARIA states) */
document.querySelectorAll('[data-modal-open]').forEach(btn => {
  const targetId = btn.getAttribute('data-modal-open')!;
  const modal = document.getElementById(targetId);
  if (!modal) return;
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector<HTMLElement>('[tabindex]')?.focus();
  });
});
document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('[role="dialog"]');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  });
});

/* ARIA live for stats */
document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
});
