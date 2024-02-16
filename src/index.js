import "./style.scss";
document.querySelector("#app").innerHTML = `
  <div class="text-4xl font-bold underline" id="app">
    
  </div>
`;
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

const app = document.querySelector("#app");
const canvas = document.createElement("canvas");
app.appendChild(canvas);

const resizeCanvas = () => {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.setProperty("width", "100%");
  canvas.style.setProperty("height", "100%");
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const box = new THREE.BoxGeometry(1, 1, 1);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const edges = new THREE.EdgesGeometry(box);
const lineSegments = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0000ff }));

const geometry = new MeshLineGeometry()
const points = lineSegments.geometry.attributes.position.array;

const p1 = new THREE.Vector3(points[0], points[1], points[2]);
const p2 = new THREE.Vector3(points[3], points[4], points[5]);
const p3 = new THREE.Vector3(points[6], points[7], points[8]);
const p4 = new THREE.Vector3(points[9], points[10], points[11]);
const p5 = new THREE.Vector3(points[12], points[13], points[14]);
const p6 = new THREE.Vector3(points[15], points[16], points[17]);
const p7 = new THREE.Vector3(points[18], points[19], points[20]);
const p8 = new THREE.Vector3(points[21], points[22], points[23]);

geometry.setPoints([
  p2, p3,
  p4, p1,
  p2,
  p5, p6, p7, p8, p5,
  p8, p3,
  p4, p7,
  p6, p1
])

const material = new MeshLineMaterial({
  color: new THREE.Color(0xff0000),
  lineWidth: 0.006,
  // lineWidth: 0.04,
});
const meshLine = new THREE.Mesh(geometry, material);
scene.add(meshLine);

camera.position.z = 5;

renderer.setPixelRatio(window.devicePixelRatio);

const animate = () => {

  meshLine.rotation.x += 0.01;
  meshLine.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();