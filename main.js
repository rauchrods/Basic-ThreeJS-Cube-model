import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// Create scene with lighter background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f353a);

// Set up camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// Create cube group to hold all elements
const cubeGroup = new THREE.Group();

// Create the main cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.9,
  roughness: 0.15,
  reflectivity: 1,
  clearcoat: 0.8,
  clearcoatRoughness: 0.1,
  envMapIntensity: 2.0,
});
const cube = new THREE.Mesh(geometry, material);
cubeGroup.add(cube);

// Function to create and position text
function createText(text, position, rotation) {
  const loader = new FontLoader();

  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
    function (font) {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 0.25, // Reduced size for better fit
        height: 0.03, // Reduced depth
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.005,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      // Center the text
      textGeometry.computeBoundingBox();
      const centerOffset = new THREE.Vector3();
      textGeometry.boundingBox.getCenter(centerOffset).multiplyScalar(-1);

      const textMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x000000, // Pure black for better contrast
        metalness: 0.5,
        roughness: 0.3,
        clearcoat: 1,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Position text
      textMesh.position.copy(position);
      textMesh.rotation.copy(rotation);

      // Apply center offset with position adjustments
      textMesh.position.x += centerOffset.x;
      textMesh.position.y += centerOffset.y;

      cubeGroup.add(textMesh);
    }
  );
}

// Add text to all six sides with adjusted positions
// Front
createText("Rauch", new THREE.Vector3(0, 0, 1.01), new THREE.Euler(0, 0, 0));
// Back
// createText(
//   "Rauch",
//   new THREE.Vector3(0, 0, -1.01),
//   new THREE.Euler(0, Math.PI, 0)
// );
// // Right
// createText(
//   "Rauch",
//   new THREE.Vector3(1.01, 0, 0),
//   new THREE.Euler(0, Math.PI / 2, 0)
// );
// // Left
// createText(
//   "Rauch",
//   new THREE.Vector3(-1.01, 0, 0),
//   new THREE.Euler(0, -Math.PI / 2, 0)
// );
// // Top
// createText(
//   "Rauch",
//   new THREE.Vector3(0, 1.01, 0),
//   new THREE.Euler(-Math.PI / 2, 0, 0)
// );
// // Bottom
// createText(
//   "Rauch",
//   new THREE.Vector3(0, -1.01, 0),
//   new THREE.Euler(Math.PI / 2, 0, 0)
// );

scene.add(cubeGroup);

// Rest of the lighting setup remains the same
const frontLight = new THREE.SpotLight(0xfff0e0, 2.0);
frontLight.position.set(0, 0, 5);
frontLight.angle = Math.PI / 6;
frontLight.penumbra = 0.1;
scene.add(frontLight);

const topLight = new THREE.SpotLight(0xffe5cc, 2.0);
topLight.position.set(0, 5, 0);
topLight.angle = Math.PI / 6;
topLight.penumbra = 0.1;
scene.add(topLight);

const rightLight = new THREE.SpotLight(0xffe5cc, 2.0);
rightLight.position.set(5, 0, 0);
rightLight.angle = Math.PI / 6;
rightLight.penumbra = 0.1;
scene.add(rightLight);

const leftLight = new THREE.SpotLight(0xffe5cc, 2.0);
leftLight.position.set(-5, 0, 0);
leftLight.angle = Math.PI / 6;
leftLight.penumbra = 0.1;
scene.add(leftLight);

const backLight = new THREE.SpotLight(0xffffff, 1.5);
backLight.position.set(0, 0, -5);
backLight.angle = Math.PI / 6;
backLight.penumbra = 0.1;
scene.add(backLight);

const rimLight1 = new THREE.PointLight(0xffffff, 1.0);
rimLight1.position.set(3, 3, -3);
scene.add(rimLight1);

const rimLight2 = new THREE.PointLight(0xffffff, 1.0);
rimLight2.position.set(-3, -3, -3);
scene.add(rimLight2);

const fillLight1 = new THREE.PointLight(0xffe5cc, 0.5);
fillLight1.position.set(2, -2, 3);
scene.add(fillLight1);

const fillLight2 = new THREE.PointLight(0xffe5cc, 0.5);
fillLight2.position.set(-2, 2, 3);
scene.add(fillLight2);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffa7, 0.6);
scene.add(hemiLight);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controls
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

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Subtle rotation
  cubeGroup.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
