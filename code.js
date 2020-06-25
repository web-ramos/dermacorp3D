/**
 * @param  {} fileTextures
 * @param  {} fileModel
 * @param  {} element3D
 */
object3D = function (fileTextures, fileModel, element3D) {

  const pointsLight = [
    {
      color: 0xffffff,
      intensity: 0.5,
      distance: 250,
      x: -50,
      y: 10,
      z: -35
    },
    {
      color: 0xffffff,
      intensity: 0.3,
      distance: 250,
      x: -10,
      y: 0,
      z: 0
    },
    {
      color: 0xffffff,
      intensity: 0.5,
      distance: 250,
      x: 1,
      y: -1,
      z: 0
    },        
  ];
  
  const renderer = new THREE.WebGLRenderer();
  const div = document.getElementById(element3D);
  console.log(div.offsetWidth, div.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    div.offsetWidth / div.offsetHeight,
    0.1,
    1000
  );

  renderer.setSize(div.offsetWidth, div.offsetHeight);
  div.appendChild(renderer.domElement);

  renderer.setClearColor(0xffffff, 1);
  
  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.load(fileTextures, function (materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
  
    objLoader.load(fileModel, function (mesh) {
      mesh.scale.set(0.5, 0.5, 0.5);
      mesh.rotation.y = 3.6;
      scene.add(mesh);
    });
  });
  
  camera.position.z = 3;
  camera.position.y = 1;
  
  const directionalLight = new THREE.DirectionalLight(0xfff9ed, 2);
  const targetObject = new THREE.Object3D();
  scene.add(targetObject);
  
  directionalLight.target = targetObject;
  directionalLight.position.set(200, 175, 130);
  scene.add(directionalLight);

  pointsLight.map((point) => {
    const pointLight = new THREE.PointLight(point.color, point.intensity, point.distance);
    pointLight.position.x = point.x;
    pointLight.position.y = point.y;
    pointLight.position.z = point.z;        
    scene.add(pointLight);    
  })
  
  const Loop = function () {
    requestAnimationFrame(Loop);
    render();
  };

  const render = function () {
    renderer.render(scene, camera);
  };  
  
  Loop();
 
  window.addEventListener("resize", function () {
    const width = div.offsetWidth;
    const height = div.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

};

object3D("models/source/Dermadrop_NBC.mtl", "models/source/Dermadrop_NBC.obj", "model3D");

const updateLeft = () => {
}

const updateRight = () => {
}