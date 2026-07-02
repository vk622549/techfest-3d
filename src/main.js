import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


import "./style.css";
import * as THREE from "three";

// ----------------------
// HTML
// ----------------------

document.querySelector("#app").innerHTML = `
<div id="canvas-container"></div>

<header>
  <nav>
    <h2>TECHFEST</h2>

    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#events">Events</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<section class="hero">

<div class="hero-content">

<h1>WELCOME TO TECHFEST 2026</h1>

<p>
Explore Innovation • AI • Robotics • Coding
</p>

<button class="glow-btn">
Explore Events 🚀
</button>

</div>

</section>

<section id="about" class="section">

<h2>About TechFest</h2>

<p>

TechFest 2026 is India's premier technology festival bringing together
students, developers, innovators and entrepreneurs.

Experience Robotics, Artificial Intelligence, Coding Competitions,
Hackathons and exciting workshops.

</p>

</section>

<section id="events" class="section">

<h2>Events</h2>

<div class="cards">

<div class="card">
<h3>Hackathon</h3>
<p>24 Hour Coding Challenge</p>
</div>

<div class="card">
<h3>AI Challenge</h3>
<p>Machine Learning Competition</p>
</div>

<div class="card">
<h3>Robotics</h3>
<p>Battle Arena</p>
</div>

<div class="card">
<h3>Web Development</h3>
<p>Frontend UI Competition</p>
</div>

<div class="card">
<h3>Gaming</h3>
<p>BGMI & Valorant Tournament</p>
</div>

<div class="card">
<h3>Cyber Security</h3>
<p>Capture The Flag (CTF)</p>
</div>

</div>

</section>

<section id="contact" class="section">

<h2>Contact</h2>

<p>Email : techfest2026@gmail.com</p>

<p>Phone : +91 9876543210</p>

<p>Location : IIT Campus</p>

</section>

<footer>

<p>© 2026 TechFest | Designed with Three.js</p>

</footer>

`;

// ----------------------
// THREE JS
// ----------------------

const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(

75,

window.innerWidth/window.innerHeight,

0.1,

1000

);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({

alpha:true,

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.setPixelRatio(

window.devicePixelRatio

);

container.appendChild(

renderer.domElement

);

// Earth

const geometry = new THREE.SphereGeometry(

1,

64,

64

);

const material = new THREE.MeshStandardMaterial({

color:0x38bdf8

});

const earth = new THREE.Mesh(

geometry,

material

);

scene.add(

earth

);

// Lights

const ambient = new THREE.AmbientLight(

0xffffff,

2

);

scene.add(

ambient

);

const directional = new THREE.DirectionalLight(

0xffffff,

3

);

directional.position.set(

5,

5,

5

);

scene.add(

directional

);
// ----------------------
// Mouse Interaction
// ----------------------

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

// ----------------------
// Animation Loop
// ----------------------

function animate() {
  requestAnimationFrame(animate);

  // Earth Rotation
  earth.rotation.y += 0.005;

  // Floating Effect
  earth.position.y = Math.sin(Date.now() * 0.001) * 0.08;

  // Mouse Follow
  earth.rotation.x = mouseY * 0.3;
  earth.rotation.z = mouseX * 0.3;

  renderer.render(scene, camera);
}

animate();

// ----------------------
// Resize
// ----------------------

window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});
gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 80,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
  });
});

gsap.from(".hero-content", {
  opacity: 0,
  y: 60,
  duration: 1.2,
});