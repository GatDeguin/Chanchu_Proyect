import './styles/motion.css';

// main.ts – entrypoint bootstrap
import './styles/tokens.css';
import './ui';

document.addEventListener('DOMContentLoaded', async () => {
  // Lazy‑load visualizaciones cuando entran en el viewport
  const observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        switch (entry.target.id) {
      case 'section-hero':
        (await import('./visualizations/hero')).initHero(entry.target);

          case 'section-particles':
            (await import('./visualizations/particles')).initParticles(entry.target);
            break;
          case 'section-network':
            (await import('./visualizations/network')).initNetwork(entry.target);
            break;
          case 'section-map':
            (await import('./visualizations/choropleth')).initMap(entry.target);
            break;
        }
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -20% 0px' });

  ['section-hero', 'section-particles', 'section-network', 'section-map']
    .map(id => document.getElementById(id)!)
    .forEach(el => observer.observe(el));
});

// Register service worker for PWA / offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
// Register generated service worker (sw.js) for PWA caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
