
// choropleth.ts – World map using topojson + d3
import * as d3 from 'd3';
import { feature } from 'topojson-client';


export async function initMap(container: HTMLElement) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select(container).append('svg')
    .attr('viewBox', [0, 0, width, height].join(' '))
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('role', 'img')
    .attr('aria-label', 'world choropleth map');

  const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json') as any;
  const countries = feature(world, world.objects.countries).features;

  const data: Record<string, number> = {};
  countries.forEach(c => { data[c.id] = Math.random(); });

  const color = d3.scaleSequential(d3.interpolateCool)
    .domain([0, 1]);

  const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: 'Sphere' });
  const path = d3.geoPath(projection);

  svg.append('g')
    .selectAll('path')
    .data(countries)
    .enter().append('path')
      .attr('d', path)
      .attr('fill', d => color(data[d.id] ?? 0))
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5)
      .append('title')
      .text(d => d.properties.name + ': ' + (data[d.id] ?? 0).toFixed(2));

  // Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    svg.attr('viewBox', `0 0 ${w} ${h}`);
    projection.fitSize([w, h], { type: 'Sphere' });
    svg.selectAll('path').attr('d', path);
  });
}
