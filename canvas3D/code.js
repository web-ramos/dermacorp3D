var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
var div = document.getElementById("model");
console.log(div);
renderer.setSize(window.innerWidth, window.innerHeight);
div.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

renderer.setClearColor(0xffffff, 1);

/*var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);*/

//var light2 = new THREE.PointLight( 0xffffff, 1, 250, 2 );
//light2.position.set( 50, 50, 50 );

//scene.add( light2 );

var buttonLeft = document.getElementById("buttonLeft");
var buttonRight = document.getElementById("buttonRight");

/*var loader = new THREE.STLLoader();
loader.load( './models/source/Dermadrop_NBC-stl.stl', function ( geometry ) {
  var material = new THREE.MeshPhongMaterial({
    map: loader.load('./models/textures/Dermadrop_TDA_SystemSurface_Color'),
  });
  var mesh = new THREE.Mesh( geometry, material ) 
  mesh.scale.set(0.02, 0.02, 0.02);
  mesh.rotation.y = 0;
  mesh.rotation.x = -1.5;
  mesh.rotation.z = -3;
  updateLeft();
  function updateLeft() {
    requestAnimationFrame(updateLeft);
    mesh.rotation.y -= 0.01;
    console.log(mesh.rotation.y);
  }
  scene.add(mesh);
});*/

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("models/source/Dermadrop_NBC.mtl", function (materials) {
  materials.preload();
  console.log(materials);
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);

  objLoader.load("models/source/Dermadrop_NBC.obj", function (mesh) {
    mesh.scale.set(0.02, 0.02, 0.02);
    mesh.rotation.y = 3.6;
    /*updateLeft();
function updateLeft() {
  requestAnimationFrame(updateLeft);
  mesh.rotation.y -= 0.01;
  console.log(mesh.rotation.y);
}*/
    scene.add(mesh);
  });
});

camera.position.z = 3;
camera.position.y = 1;

var directionalLight = new THREE.DirectionalLight(0xfff9ed, 2);
var targetObject = new THREE.Object3D();
scene.add(targetObject);

directionalLight.target = targetObject;
directionalLight.position.set(200, 175, 130);
scene.add(directionalLight);

var light2 = new THREE.PointLight(0xffffff, 0.5, 250);
light2.position.set(-50, 10, -35);

scene.add(light2);

var light3 = new THREE.PointLight(0xffffff, 0.3, 250);
light3.position.set(-10, 0, 0);

scene.add(light3);

var light4 = new THREE.PointLight(0xffffff, 0.5, 250);
light4.position.set(1, -1, 0);

scene.add(light4);

function debug() {
  var cx = document.getElementById("cx").value;
  var cy = document.getElementById("cy").value;
  var cz = document.getElementById("cz").value;
}

function updateRight() {}

function updateLeft() {}

var render = function () {
  renderer.render(scene, camera);
};

var Loop = function () {
  requestAnimationFrame(Loop);
  render();
};

Loop();
