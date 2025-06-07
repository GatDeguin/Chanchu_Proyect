// build-sw.js – Genera un Service Worker avanzado con Workbox
const { generateSW } = require('workbox-build');

generateSW({
  swDest: 'dist/sw.js',
  globDirectory: 'dist',
  globPatterns: [
    '**/*.{html,js,css,png,json,webmanifest}'
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.+\.(json|js)/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'cdn-cache' }
    },
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/world-atlas\/.+\.json/,
      handler: 'NetworkFirst',
      options: { cacheName: 'world-atlas-cache', networkTimeoutSeconds: 5 }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-assets',
        expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }
      }
    }
  ]
}).then(({ count, size, warnings }) => {
  warnings.forEach(console.warn);
  console.log(`Generated sw.js, which will precache ${count} files, totaling ${size} bytes.`);
});
