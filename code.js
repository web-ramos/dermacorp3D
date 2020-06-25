/**
 * @param  {} fileTextures
 * @param  {} fileModel
 * @param  {} element3D
 */
object3D = function (fileTextures, fileModel, element3D, callBack) {

  const div = document.getElementById(element3D);
  let objMesh = null;

  const meshParams = {
    scale: 0.039,
    x: 0,
    y: -1.75,
    z: 0,
    startRotationY: 3.5
  }  

  const pointsLight = [
    {
      color: 0xffffff,
      intensity: 0.7,
      distance: 250,
      x: -50,
      y: 10,
      z: -35
    },
    {
      color: 0xffffff,
      intensity: 0.4,
      distance: 250,
      x: -10,
      y: 0,
      z: 0
    },
    {
      color: 0xffffff,
      intensity: 0.35,
      distance: 250,
      x: 1,
      y: -1,
      z: 0
    }
  ];

  const directionLight = {
    color: 0xfefefe,
    intensity: 1.5,
    x: 200,
    y: 175,
    z: 130
  }

  const cameraParams = {
    fov: 75,
    aspect: div.offsetWidth / div.offsetHeight,
    near: 1,
    far: 500,
    x: 2,
    y: 2,
    z: 2
  }

  const bgParams = {
    color: 0xffffff,
    opacity: 1
  }

  const renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
  });

  const scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera(
    cameraParams.fov,
    cameraParams.aspect,
    cameraParams.near,
    cameraParams.far
  );

  camera.position.x = cameraParams.x;
  camera.position.z = cameraParams.z;
  camera.position.y = cameraParams.y;

  scene.add( camera );

  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.minPolarAngle = Math.PI/2;
  controls.maxPolarAngle = Math.PI/2;
  controls.enableZoom = false;

  controls.update();  

  renderer.setSize(div.offsetWidth, div.offsetHeight);
  div.appendChild(renderer.domElement);

  renderer.setClearColor(bgParams.color, bgParams.opacity);
  
  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.load(fileTextures, function (materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
  
    objLoader.load(fileModel, function (mesh) {
      mesh.scale.set(meshParams.scale, meshParams.scale, meshParams.scale);
      mesh.rotation.y = meshParams.startRotationY;
      mesh.position.x = meshParams.x;
      mesh.position.y = meshParams.y;
      mesh.position.z = meshParams.z;
      objMesh = mesh;      
      scene.add(mesh);
      callBack();      
    });
  });
  

  /**
   *  Set Direction light
   */
  const directionalLight = new THREE.DirectionalLight(directionLight.color, directionLight.intensity);
  const targetObject = new THREE.Object3D();
  scene.add(targetObject);
  directionalLight.target = targetObject;
  directionalLight.position.set(directionLight.x, directionLight.y, directionLight.z);
  scene.add(directionalLight);

  /**
   * Set pionts light
   */
  pointsLight.map((point) => {
    const pointLight = new THREE.PointLight(point.color, point.intensity, point.distance);
    pointLight.position.x = point.x;
    pointLight.position.y = point.y;
    pointLight.position.z = point.z;        
    scene.add(pointLight);    
  })
  
  /**
   * render functions
   */
  const Loop = function () {
    requestAnimationFrame(Loop);
    controls.update();    
    renderer.render(scene, camera);
  };

  /**
   * rotation
   */
  this.turn = function(radius) {
    if (objMesh.rotation.y + radius > -Math.PI * 4 && objMesh.rotation.y + radius < Math.PI * 4) {
      objMesh.rotation.y += radius;
      controls.update();      
    } else {
      objMesh.rotation.y = 0;
    }
  }

  Loop();
  
  /**
   * resize
   */
  window.addEventListener("resize", function () {
    const width = div.offsetWidth;
    const height = div.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  return this;
};

onLoad3D = function () {
  const el = document.getElementById('model3D__loader');
  el.style.display = 'none';
}

const objDerma = object3D("models/source/Dermadrop_NBC.mtl", "models/source/Dermadrop_NBC.obj", "model3D", onLoad3D);

const updateLeft = () => {
  objDerma.turn(Math.PI/6);
}

const updateRight = () => {
  objDerma.turn(-Math.PI/6);  
}