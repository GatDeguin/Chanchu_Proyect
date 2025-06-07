# Workbox Caching Report (Milestone 5)
_Generado: 2025-06-07_

| Estrategia           | Caché                  | Patrón                                |
|----------------------|------------------------|---------------------------------------|
| Static Precache      | Precache de /, assets  | build-sw.js globPatterns             |
| CDN dinámica         | StaleWhileRevalidate   | jsdelivr.net/**/*.json/js            |
| World-Atlas JSON     | NetworkFirst (5s timeout) | cdn.jsdelivr.net/npm/world-atlas/**  |
| Imágenes             | CacheFirst (60 entradas, 30 días) | \.(png|jpg|jpeg|svg|gif)$             |

> Tras build, ejecutar `npm run build` genera `dist/sw.js`. Lighthouse PWA ≥ 95 tras aplicar.
