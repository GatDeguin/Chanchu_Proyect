
// particles.ts – Three.js starfield
import * as THREE from 'three';

export function initParticles(container: HTMLElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
  camera.position.z = 200;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create particles
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(10000 * 3);
  for (let i = 0; i < vertices.length; i++) {
    vertices[i] = THREE.MathUtils.randFloatSpread(600);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);

  const animate = () => {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0005;
    renderer.render(scene, camera);
  };
  animate();
}
