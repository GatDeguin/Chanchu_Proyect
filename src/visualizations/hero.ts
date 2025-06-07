// hero.ts – Scroll-driven hero animation (parallax + glitch text)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initHero(container: HTMLElement) {
  const title = container.querySelector<HTMLElement>('.hero-title');
  if (!title) return;

  // Parallax effect
  gsap.to(title, {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Glitch effect timeline
  const glitchTl = gsap.timeline({ repeat: -1, paused: true });
  glitchTl.to(title, { x: () => gsap.utils.random(-5, 5), duration: 0.1 })
          .to(title, { x: () => gsap.utils.random(-5, 5), duration: 0.1 })
          .to(title, { x: 0, duration: 0.1, delay: 2 });

  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    onEnter: () => glitchTl.play(),
    onLeaveBack: () => glitchTl.pause(0)
  });
}
