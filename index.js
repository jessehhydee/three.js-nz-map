import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { locations } from './locations.data.js';

const vertex = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;
  uniform float u_mouseDown;
  uniform float u_mouseUp;

  vec3 exx(vec3 newPosition, vec3 fixedPosition) {
    if(u_mouseDown > 0.0 && u_mouseUp > 0.0 && sin(u_time) < -1.0) return newPosition.xyz = fixedPosition.xyz;
    else if(u_mouseDown > 0.0) return newPosition.xyz = newPosition.xyz + sin(u_time);
    else return newPosition.xyz = fixedPosition.xyz;
  }

  void main() {

    vec3 newPosition    = position;
    vec3 fixedPosition  = position;
    vec3 pos = exx(newPosition, fixedPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

  }
`;
const smallFragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;

  vec3 colorA = vec3(0.474, 0.666, 0.784);
  vec3 colorB = vec3(0.192, 0.384, 0.498);

  void main() {

    vec3  color = vec3(0.0);
    float pct   = abs(sin(u_time));
          color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);

  }
`;
const locationFragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;

  vec3 colorA = vec3(0.764, 0.898, 0.976);
  vec3 colorB = vec3(0.423, 0.713, 0.878);

  void main() {

    vec3  color = vec3(0.0);
    float pct   = abs(sin(u_time));
          color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);

  }
`;

const container = document.querySelector('.container');
const canvas    = document.querySelector('.canvas');

let
sizes,
scene,
camera,
renderer,
raycaster,
mouse,
isIntersecting,
allMeshesGroup,
locationsGroup,
labelRenderer,
locationLabelParent,
locationLabelText,
locationLabel,
baseMesh,
time,
twinkleTime,
recentlyInteracted,
allMaterials,
locationMaterials,
smallMaterial,
locationMaterial;


const setScene = () => {

  sizes = {
    width:  container.offsetWidth,
    height: container.offsetHeight
  };

  scene = new THREE.Scene();

  camera             = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 1, 1000);
  camera.position.z  = 80;
  
  renderer = new THREE.WebGLRenderer({
    canvas:     canvas,
    antialias:  false,
    alpha:      true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const pointLight = new THREE.PointLight(0x081b26, 35, 200);
  pointLight.position.set(-25, 0, 60);
  scene.add(pointLight);

  raycaster      = new THREE.Raycaster();
  mouse          = new THREE.Vector2();
  isIntersecting = false;

  allMeshesGroup = new THREE.Group();
  locationsGroup = new THREE.Group(); 

  createLabel();
  setBaseSphere();
  setShaderMaterial();
  setMap();
  resize();
  listenTo();
  render();

}

const createLabel = () => {

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(labelRenderer.domElement);

  locationLabelParent           = document.createElement('div');
  locationLabelParent.className = 'label_container';
  const locationLabelChild      = document.createElement('div');
  locationLabelChild.className  = 'label';
  locationLabelText             = document.createElement('p');
  locationLabelText.className   = 'label_p';
  const locationLabelImg        = document.createElement('img');
  locationLabelImg.className    = 'label_img';
  locationLabelImg.src          = 'https://www.coffeestamp.co.nz/website/img/cs_logo.png';
  locationLabelImg.alt          = 'Coffee Stamp Logo';
  locationLabelParent.appendChild(locationLabelChild);
  locationLabelChild.appendChild(locationLabelImg);
  locationLabelChild.appendChild(locationLabelText);
  locationLabel = new CSS2DObject(locationLabelParent);

  scene.add(locationLabel);

}

const setBaseSphere = () => {

  const baseSphere   = new THREE.SphereGeometry(19.5, 35, 35);
  const baseMaterial = new THREE.MeshStandardMaterial({color: 0x081b26});
  baseMesh           = new THREE.Mesh(baseSphere, baseMaterial);
  allMeshesGroup.add(baseMesh);

}

const setShaderMaterial = () => {

  time               = 0;
  twinkleTime        = 0.02;
  recentlyInteracted = false;
  allMaterials       = [];
  locationMaterials  = [];
  smallMaterial      = new THREE.ShaderMaterial({
    side:     THREE.DoubleSide,
    uniforms: {
      u_time:         { value: 1.0 },
      u_mouseDown:    { value: 0.0 },
      u_mouseUp:      { value: 0.0 }
    },
    vertexShader:   vertex,
    fragmentShader: smallFragment,
  });
  locationMaterial = new THREE.ShaderMaterial({
    side:     THREE.DoubleSide,
    uniforms: {
      u_time:         { value: 1.0 },
      u_mouseDown:    { value: 0.0 },
      u_mouseUp:      { value: 0.0 }
    },
    vertexShader:   vertex,
    fragmentShader: locationFragment,
  });

}

const setMap = () => {

  const calcPosFromLatLonRad = (lon, lat, radius = 20) => {
  
    var phi   = (180 - lat)  * (Math.PI / 360);
    var theta = (lon + 360) * (Math.PI / 360);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
  
    return new THREE.Vector3(x, y, z);

  }

  const createMaterial = (timeValue, location) => {

    let mat;

    if(!location) {
      mat                       = smallMaterial.clone();
      mat.uniforms.u_time.value = timeValue;
      allMaterials.push(mat);
    }
    else {
      mat                       = locationMaterial.clone();
      mat.uniforms.u_time.value = timeValue;
      allMaterials.push(mat);
      locationMaterials.push(mat);
    }
    return mat;

  }

  const image   = new Image;
  image.onload  = () => {

    image.needsUpdate  = true;

    const imageCanvas  = document.createElement('canvas');
    imageCanvas.width  = image.width;
    imageCanvas.height = image.height;
      
    const context = imageCanvas.getContext('2d');
    context.drawImage(image, 0, 0);
      
    const imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);

    let vector    = new THREE.Vector3();
    let dotAmount = 0;

    for(let i = 0, lon = -360, lat = 180; i < imageData.data.length; i += 4, lon += 2) {

      const red   = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue  = imageData.data[i + 2];

      if(red > 100 && green > 100 && blue > 100) {

        dotAmount++;

        vector = calcPosFromLatLonRad(lon, lat);

        let 
        dotGeometry,
        m;
        for(let x = 0; x < locations.length; x++) {
          if(dotAmount === locations[x].dot) {
            dotGeometry       = new THREE.CircleGeometry(0.14, 10);
            dotGeometry.name  = locations[x].storeName;
            m                 = createMaterial(i / 4, true);
            break;
          }
        }
        if(!m) {
          dotGeometry = new THREE.CircleGeometry(0.1, 5);
          m           = createMaterial(i / 4, false);
        }

        dotGeometry.lookAt(vector);
        dotGeometry.translate(vector.x, vector.y, vector.z);

        const mesh = new THREE.Mesh(dotGeometry, m);

        if(mesh.geometry.parameters.radius === 0.14) locationsGroup.add(mesh);
        else allMeshesGroup.add(mesh);
        
      }

      if(lon === 360) {
        lon  =  -360;
        lat -=  2;
      }

    }
    
  }

  image.src = 'img/nz.jpg';

  locationsGroup.rotation.y = 4.65;
  allMeshesGroup.rotation.y = 4.65;

  scene.add(allMeshesGroup);
  scene.add(locationsGroup);

}

const resize = () => {

  sizes = {
    width:  container.offsetWidth,
    height: container.offsetHeight
  }

  if(window.innerWidth > 700) camera.position.z = 80;
  else if(window.innerWidth <= 700 && window.innerWidth > 450) camera.position.z = 110;
  else camera.position.z = 130;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  labelRenderer.setSize(sizes.width, sizes.height);

}

const mousemove = event => {

  isIntersecting = false;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  
  const intersectsBaseMesh = raycaster.intersectObject(baseMesh);
  if(intersectsBaseMesh[0]) {
    isIntersecting = true;
    document.body.style.cursor = 'pointer';
  }
  else document.body.style.cursor = 'default';

  const intersectsLocations = raycaster.intersectObject(locationsGroup);
  if(intersectsLocations[0]) {

    locationLabelText.textContent         = intersectsLocations[0].object.geometry.name;
    locationLabelParent.style.visibility  = 'visible';

    locationLabel.position.set(intersectsLocations[0].point.x, intersectsLocations[0].point.y, intersectsLocations[0].point.z);

  }
  else locationLabelParent.style.visibility = 'hidden';

}

const mousedown = () => {

  if(!isIntersecting || 
    allMaterials[allMaterials.length - 1].uniforms.u_mouseDown.value === 1.0) return;

  gsap.to(baseMesh.scale, {x: 0.95, y: 0.95, z: 0.95, duration: 1});

  allMaterials.forEach(el => {
    el.uniforms.u_mouseDown.value = 1.0;
  });

}

const mouseup = () => {

  if(!isIntersecting || recentlyInteracted) return;

  recentlyInteracted = true;
  setTimeout(() => recentlyInteracted = false, 1500);

  gsap.to(baseMesh.scale, {
    x: 1, 
    y: 1, 
    z: 1, 
    duration: 1
  });

  allMaterials.forEach(el => {
    el.uniforms.u_mouseUp.value = 1.0;
    setTimeout(() => {
      el.uniforms.u_mouseDown.value = 0.0;
      el.uniforms.u_mouseUp.value   = 0.0;
    }, 100);
  });

}

const listenTo = () => {

  window.addEventListener('resize',     resize.bind(this));
  window.addEventListener('mousemove',  mousemove.bind(this));
  window.addEventListener('mousedown',  mousedown.bind(this));
  window.addEventListener('mouseup',    mouseup.bind(this));

}

const render = () => {

  time += 0.019;
  allMeshesGroup.position.y = Math.sin(time) * 0.4;
  locationsGroup.position.y = Math.sin(time) * 0.4;

  allMaterials.forEach(el => {
    el.uniforms.u_time.value += twinkleTime;
  });

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(render.bind(this));

}

setScene();