import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create scene with lighter background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f353a); // Medium gray with slight blue tint

// Set up camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// Create stainless steel cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // Pure white/silver
  metalness: 0.9, // High metalness
  roughness: 0.15, // Very low roughness for high shine
  reflectivity: 1, // Maximum reflectivity
  clearcoat: 0.8, // Clear coat for extra shine
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5, // Increased environment map intensity
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create multiple lights for better reflections
// Main front light
const frontLight = new THREE.SpotLight(0xfff0e0, 2.5);
frontLight.position.set(0, 0, 5);
frontLight.angle = Math.PI / 6;
frontLight.penumbra = 0.1;
scene.add(frontLight);

// Top light
const topLight = new THREE.SpotLight(0xffe5cc, 2.5);
topLight.position.set(0, 5, 0);
topLight.angle = Math.PI / 6;
topLight.penumbra = 0.1;
scene.add(topLight);

// Right light
const rightLight = new THREE.SpotLight(0xffe5cc, 2.5);
rightLight.position.set(5, 0, 0);
rightLight.angle = Math.PI / 6;
rightLight.penumbra = 0.1;
scene.add(rightLight);

// Left light
const leftLight = new THREE.SpotLight(0xffe5cc, 2.5);
leftLight.position.set(-5, 0, 0);
leftLight.angle = Math.PI / 6;
leftLight.penumbra = 0.1;
scene.add(leftLight);

// Back light for rim lighting
const backLight = new THREE.SpotLight(0xffffff, 2);
backLight.position.set(0, 0, -5);
backLight.angle = Math.PI / 6;
backLight.penumbra = 0.1;
scene.add(backLight);

// Additional rim lights for edge definition
const rimLight1 = new THREE.PointLight(0xffffff, 1.5);
rimLight1.position.set(3, 3, -3);
scene.add(rimLight1);

const rimLight2 = new THREE.PointLight(0xffffff, 1.5);
rimLight2.position.set(-3, -3, -3);
scene.add(rimLight2);

// Soft fill lights
const fillLight1 = new THREE.PointLight(0xffe5cc, 0.8);
fillLight1.position.set(2, -2, 3);
scene.add(fillLight1);

const fillLight2 = new THREE.PointLight(0xffe5cc, 0.8);
fillLight2.position.set(-2, 2, 3);
scene.add(fillLight2);

// Increased ambient light for lighter scene
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFA7, 0.6);
scene.add(hemiLight);

// Set up renderer with enhanced settings
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2; // Slightly increased exposure
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;
controls.enablePan = true;

// Handle window resize
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop with subtle rotation
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Subtle continuous rotation
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
