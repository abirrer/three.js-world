// Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50
);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Earth Mesh
var earthGeometry = new THREE.SphereGeometry(10, 32, 32);
var earthMaterial = new THREE.MeshPhongMaterial();
earthMaterial.map = new THREE.TextureLoader().load("assets/earthmap4k.jpg");
var earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// Moon Mesh
var moonGeometry = new THREE.SphereGeometry(2.5, 32, 32);
var moonMaterial = new THREE.MeshPhongMaterial();
moonMaterial.map = new THREE.TextureLoader().load("assets/moonmap4k.jpg");
var moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

var pivot = new THREE.Object3D();

scene.add(moonMesh);
pivot.add(moonMesh);
moonMesh.position.set(12, 5, 10);
scene.add(pivot);

//TextGeometry
var loader = new THREE.FontLoader();

loader.load("/assets/fonts/helvetiker_bold.typeface.json", function(font) {
    var textMaterial = new THREE.MeshNormalMaterial();
    var textGeometry = new THREE.TextGeometry("Hello, World!", {
        font: font,
        size: 4,
        height: 1.5
    });
    var textMesh = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(textMesh);
    textMesh.position.set(-17, 12, 0);
});

// Text Mesh

// Orbit Controls
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

// dat.GUI
var controls = new function() {
    // this.textColor = 0xffae23;
    this.guiRotationX = 0.005;
    this.guiRotationY = 0.005;
}();

var gui = new dat.GUI();
gui.add(controls, "guiRotationX", 0, 0.2);
gui.add(controls, "guiRotationY", 0, 0.2);

// gui.addColor(controls, "textColor").onChange(function(e) {
//     textMesh.material.color = new THREE.Color(e);
// });

// Render
var render = function() {
    requestAnimationFrame(render);
    earthMesh.rotation.x += controls.guiRotationX;
    earthMesh.rotation.y += controls.guiRotationY;
    moonMesh.rotation.x += 0.01;
    moonMesh.rotation.y += 0.01;
    pivot.rotation.y += 0.01;
    renderer.render(scene, camera);
};
render();

// Skybox
var imagePrefix = "assets/";
var urls = [
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg"
];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

//Responsiveness

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
