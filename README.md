
# Proyecto Chanchu (Milestone 2)

Este hito migra completamente la lógica del HTML monolítico a módulos ES + TypeScript,
divide el bundle con `import()` dinámicos y añade accesibilidad y pruebas básicas.

## Comandos rápidos

```bash
npm install        # instala deps
npm run dev        # servidor en localhost:5173
npm run build      # genera producción en /dist
npm run preview    # sirve /dist
npm run test       # vitest
```

## Estructura

```
src/
  main.ts               # bootstrap
  ui.ts                 # helpers de UI
  visualizations/
    particles.ts
    network.ts
    choropleth.ts
  styles/
    tokens.css
reports/
  lighthouse-base.md
```
