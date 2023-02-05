import "./style.css";
import * as T from "three";
import gsap from "gsap";
import { AxesHelper, MathUtils } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// let canvas = document.querySelector('.WebGLClass')
// let scene = new THREE.Scene()
//// make object
// let geometry = new THREE.BoxGeometry(1, 1, 1)
// let material = new THREE.MeshBasicMaterial({ color: 'red' })
// let mesh = new THREE.Mesh(geometry, material)

//// move object
// mesh.position.x = 0.2
// mesh.position.z = 0.5
// mesh.position.y = 0.5

//// make a scale for mesh
// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 1
// mesh.scale.set(0.8, 0.5, 1)

// //rotation
// also you can change order if xyz to bat you have to reorder it before rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.reorder('XYZ')bnr
// mesh.rotation.reorder('ZXY')
// mesh.rotation.z = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25

// //round the object position
// mesh.position.normalize()
// scene.add(mesh)

//// make a helper axes
// let axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

//// set a size
// let sizes = {
//     width: screen.availWidth,
//     height: screen.availHeight
// }

// //make a perspective
// let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// //set a look direction
// camera.position.z = 5
// camera.position.x = 0
// camera.position.y = 0
// camera.lookAt(new THREE.Vector3(1, 0, 0))

//// it give use reduce of positions
// console.log(mesh.position.length());

//// we give scene a camera
// scene.add(camera)

//// give our canvas to webgl to render it
// let renderer = new THREE.WebGL1Renderer({
//     canvas
// })

//// give renderer size
// renderer.setSize(sizes.width, sizes.height)

// // animate

// let time = Date.now()
// let clock = new THREE.Clock()

// gsap.to(mesh.position,{duration:1,delay:1 , x:2})
// gsap.to(mesh.position,{duration:1,delay:2 , x:0})
// gsap.to(mesh.position,{duration:1,delay:3 , y:2})
// gsap.to(mesh.position,{duration:1,delay:4 , y:0})

// const tick = () => {

//     requestAnimationFrame(tick)
// console.log('first')
// mesh.position.x += 0.01
// mesh.rotation.y+=0.01

// there is tho way to use time for animate to our animate be uniq
// wey n 1
// let currentTime = Date.now()
// let deltaTime = currentTime - time
// time = currentTime
// mesh.rotation.y += 0.001 * deltaTime

//    wey n2
// const elapsedTime = clock.getElapsedTime()
// mesh.rotation.x = Math.cos(elapsedTime * 0.5)
// mesh.rotation.y = Math.sin(elapsedTime * 0.5)
// mesh.position.x = Math.cos(elapsedTime)
// mesh.position.y = Math.sin(elapsedTime)
// camera.lookAt(mesh.position)
// console.log(elapsedTime);

//     renderer.render(scene, camera)
// }

//// and we rendered 'renderer'

// tick()


let canvas = document.querySelector(".WebGLClass");
let scene = new T.Scene();
let geometry = new T.SphereGeometry(15,20,20);
let metreial = new T.MeshBasicMaterial({ 
  color: "green" 
  ,wireframe:true
});

let mesh = new T.Mesh(geometry, metreial);
scene.add(mesh);



const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
addEventListener("resize", (e) => {
  console.log(e);
  Sizes.width = window.innerWidth;
  Sizes.height = window.innerHeight;

  // update Camera
  camera.aspect = Sizes.width / Sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(Sizes.width, Sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// let cameraPos = {
//     x: 0,
//     y: 0
// }
let camera = new T.PerspectiveCamera(75, Sizes.width / Sizes.height, 0.1, 100);

// canvas.addEventListener('mousemove', (e) => {
//     console.log(e.clientX)
//     cameraPos.x = -(e.clientX / Sizes.width - 0.5)
//     cameraPos.y = e.clientY / Sizes.height - 0.5
// })

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

let renderer = new T.WebGLRenderer({
  canvas,
});
renderer.setSize(Sizes.width, Sizes.height);
// gsap.to(mesh.position,{duration:2,delay:1 , x:2})
// gsap.to(mesh.position,{duration:3,delay:2 , x:0})
// gsap.to(mesh.position,{duration:4,delay:3 , x:5})
// gsap.to(mesh.position,{duration:5,delay:4 , x:2})

let inputValueX = document.querySelector(".inputNumberX");
let inputValueY = document.querySelector(".inputNumberY");

let valueX = 0;
let valueY = 0;

inputValueX.addEventListener("input", (e) => {
  valueX = e.target.value;
});

inputValueY.addEventListener("input", (e) => {
  valueY = e.target.value;
});
let axesHelper = new T.AxesHelper();
scene.add(axesHelper);

let control = new OrbitControls(camera, canvas);
control.enableDamping = true;

let clock = new T.Clock();
const animate = () => {
  // camera.position.x = Math.sin(cameraPos.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cameraPos.x * Math.PI * 2) * 3
  // camera.position.y = cameraPos.y *5
  camera.lookAt(mesh.position);
  requestAnimationFrame(animate);
  control.update();
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime * valueY;
  mesh.rotation.x = elapsedTime * valueX;

  renderer.render(scene, camera);
};

animate();
