
// network.ts – D3 force‑directed graph
import * as d3 from 'd3';

interface Node { id: string; group: number }
interface Link { source: string; target: string }

export function initNetwork(container: HTMLElement) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('role', 'img')
    .attr('aria-label', 'network graph');

  const nodes: Node[] = d3.range(50).map(i => ({ id: `n${i}`, group: Math.floor(i/10) }));
  const links: Link[] = d3.range(75).map(() => ({
    source: `n${Math.floor(Math.random()*50)}`,
    target: `n${Math.floor(Math.random()*50)}`
  }));

  const simulation = d3.forceSimulation<Node>(nodes)
    .force('charge', d3.forceManyBody().strength(-60))
    .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(80));

  const link = svg.append('g')
    .attr('stroke', 'currentColor')
    .attr('stroke-opacity', 0.2)
    .selectAll('line')
    .data(links)
    .enter().append('line');

  const node = svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', 6)
    .attr('fill', d => d3.schemeCategory10[d.group]);

  node.append('title').text(d => d.id);

  simulation.on('tick', () => {
    link.attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

    node.attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
  });

  // Resize
  window.addEventListener('resize', () => {
    const w = container.clientWidth, h = container.clientHeight;
    svg.attr('width', w).attr('height', h);
    simulation.force('center', d3.forceCenter(w / 2, h / 2)).alpha(0.5).restart();
  });
}
