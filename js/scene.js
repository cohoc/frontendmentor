import * as THREE from 'three';
import {OrbitControls} from 'jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
})

const width = canvas.clientWidth;
const height = canvas.clientHeight;
renderer.setSize(width, height, false);
//renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setClearColor(0x000000, 0);

const camera = new THREE.PerspectiveCamera(
    60, 
    width / height,
    0.1,
    900
)

camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(0,0,0)

const ambLight = new THREE.AmbientLight(0xffffff, .75);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(0, 75, 100);
scene.add(dirLight);
scene.add(ambLight);

const cubeGroup = new THREE.Group();
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshPhongMaterial({
    color: 0xfcfcfc, 
    shininess: 150
});
const count = 850;
for(let i = 0; i < count; i++){
    let theta = Math.random() * 2 * Math.PI;
    let phi = Math.acos(2 * Math.random() - 1);
    let radius = Math.cbrt(Math.random() * 15625);
    let sinT = Math.sin(theta);
    let sinP = Math.sin(phi);
    let cosT = Math.cos(theta);
    let cosP = Math.cos(phi);
    let x = radius * sinP * cosT;
    let y = radius * sinP * sinT;
    let z = radius * cosP;
    let randx = Math.random() * (90) - 50;
    let randy = Math.random() * (90) - 50;
    
    let cube = new THREE.Mesh(geometry, material);
    cube.name = "cube" + i;
    //let direction = new THREE.Vector3().randomDirection();
    //let pos = direction.multiplyScalar(radius);
    cube.position.set(x,y,z);
    cube.rotation.x = randx;
    cube.rotation.y = randy;
    cubeGroup.add(cube);
    scene.add(cube);
}
//const controls = new OrbitControls(camera, renderer.domElement);
//console.log(scene);
//console.log(cubeGroup);
window.addEventListener("resize", windowResize);
window.addEventListener("scroll", mouseScroll);

function animate(){
    requestAnimationFrame(animate);
    for(let j = 0; j < count; j++){
        let object = scene.getObjectByName(`cube${j}`);
        object.rotation.x += Math.random() * .003;
        object.rotation.y += Math.random() *.003;
    }
    renderer.render(scene, camera);
    //controls.update();
}

function windowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
}

function mouseScroll(){
    const tag = document.querySelector("#canvas");
    const y = window.scrollY / document.body.scrollHeight;
    tag.style.setProperty('--gradient-percent', (100 - (y * 50)) + '%');
    camera.position.y = -1.5 - window.scrollY / 150;
}

animate();