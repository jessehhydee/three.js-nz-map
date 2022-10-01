import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import vertex from './shaders/vertex.glsl';
import smallFragment from './shaders/smallFragment.glsl';
import locationFragment from './shaders/locationFragment.glsl';
import gsap from 'gsap';

export default class Globe {

  constructor(options) {

    this.locations = [
      {
        storeName:  'BP 2go Ninety Mile Motors',
        dot:        8
      },
      {
        storeName:  'BP 2go Kaeo',
        dot:        11
      },
      {
        storeName:  'BP 2go Kaitaia',
        dot:        13
      },
      {
        storeName:  'BP 2go Kerikeri',
        dot:        16
      },
      {
        storeName:  'BP 2go Kawakawa',
        dot:        21
      },
      {
        storeName:  'BP 2go Whakapara',
        dot:        27
      },
      {
        storeName:  'BP 2go Dargaville',
        dot:        35
      },
      {
        storeName:  'Robert Harris Cafe Albany',
        dot:        43
      },
      {
        storeName:  'Robert Harris Cafe Fernhill',
        dot:        44
      },
      {
        storeName:  'BP 2go Bruce McLaren',
        dot:        45
      },
      {
        storeName:  'BP 2go Waikumete',
        dot:        46
      },
      {
        storeName:  'BP 2go New Lynn',
        dot:        47
      },
      {
        storeName:  'Robert Harris Cafe Mt Eden',
        dot:        49
      },
      {
        storeName:  'BP 2go Landscape',
        dot:        50
      },
      {
        storeName:  'BP 2go Meadowbank',
        dot:        52
      },
      {
        storeName:  'BP 2go Hillside',
        dot:        53
      },
      {
        storeName:  'Robert Harris Cafe East Tamaki',
        dot:        54
      },
      {
        storeName:  'BP 2go Opaheke',
        dot:        60
      },
      {
        storeName:  'Robert Harris Cafe Pukekohe',
        dot:        66
      },
      {
        storeName:  'BP 2go Katikait',
        dot:        69
      },
      {
        storeName:  'Robert Harris Cafe Katikati',
        dot:        70
      },
      {
        storeName:  'BP 2go Raglan',
        dot:        71
      },
      {
        storeName:  'Robert Harris Cafe The Base',
        dot:        73
      },
      {
        storeName:  'Robert Harris Cafe Te Rapa',
        dot:        74
      },
      {
        storeName:  'BP 2go Morrinsville',
        dot:        75
      },
      {
        storeName:  'BP 2go Summit',
        dot:        77
      },
      {
        storeName:  'Robert Harris Cafe Chartwell',
        dot:        79
      },
      {
        storeName:  'Robert Harris Cafe Cambridge',
        dot:        80
      },
      {
        storeName:  'Robert Harris Cafe Matamata',
        dot:        81
      },
      {
        storeName:  'Robert Harris Cafe Tauranga',
        dot:        82
      },
      {
        storeName:  'BP 2go Maungatapu',
        dot:        83
      },
      {
        storeName:  'Caltex Bayfair',
        dot:        84
      },
      {
        storeName:  'Robert Harris Cafe Papamoa',
        dot:        94
      },
      {
        storeName:  'BP 2go Te Puke',
        dot:        95
      },
      {
        storeName:  'BP 2go Pongakawa',
        dot:        96
      },
      {
        storeName:  'Robert Harris Cafe Te Awamutu',
        dot:        104
      },
      {
        storeName:  'BP 2go Putararu',
        dot:        106
      },
      {
        storeName:  'Robert Harris Cafe Whakatane',
        dot:        111
      },
      {
        storeName:  'Robert Harris Cafe Tokoroa',
        dot:        123
      },
      {
        storeName:  'BP 2go Te Kuiti',
        dot:        135
      },
      {
        storeName:  'Robert Harris Cafe Taupo',
        dot:        171
      },
      {
        storeName:  'BP 2go Waitara',
        dot:        181
      },
      {
        storeName:  'BP 2go Taumaranui',
        dot:        185
      },
      {
        storeName:  'BP 2go Moturoa',
        dot:        198
      },
      {
        storeName:  'Robert Harris Cafe New Plymouth',
        dot:        199
      },
      {
        storeName:  'BP 2go Carlyl',
        dot:        240
      },
      {
        storeName:  'BP 2go Greenmeadows',
        dot:        250
      },
      {
        storeName:  'BP 2go Clive',
        dot:        251
      },
      {
        storeName:  'BP 2go Racecourse',
        dot:        259
      },
      {
        storeName:  'BP 2go Millward Motors',
        dot:        260
      },
      {
        storeName:  'BP 2go Hunterville',
        dot:        263
      },
      {
        storeName:  'BP 2go Waipukurau',
        dot:        266
      },
      {
        storeName:  'BP 2go North End',
        dot:        270
      },
      {
        storeName:  'Caltex Fielding',
        dot:        271
      },
      {
        storeName:  'BP 2go Pioneer',
        dot:        276
      },
      {
        storeName:  'BP 2go Main',
        dot:        277
      },
      {
        storeName:  'Caltex Fitzherbet',
        dot:        278
      },
      {
        storeName:  'Robert Harris Cafe Palmerston North',
        dot:        284
      },
      {
        storeName:  'Robert Harris Cafe Paraparaumu',
        dot:        294
      },
      {
        storeName:  'Robert Harris Cafe Nelson',
        dot:        318
      },
      {
        storeName:  'Caltex Stokes Valley',
        dot:        323
      },
      {
        storeName:  'BP 2go Newlands',
        dot:        324
      },
      {
        storeName:  'BP 2go Berhampore',
        dot:        338
      },
      {
        storeName:  'BP 2go Westport',
        dot:        353
      },
      {
        storeName:  'Robert Harris Cafe Greymouth',
        dot:        387
      },
      {
        storeName:  'BP 2go Kaikoura',
        dot:        397
      },
      {
        storeName:  'BP 2go Hokitika',
        dot:        408
      },
      {
        storeName:  'BP 2go Sawyers Arms',
        dot:        449
      },
      {
        storeName:  'Robert Harris Cafe Papanui',
        dot:        459
      },
      {
        storeName:  'BP 2go Papanui',
        dot:        460
      },
      {
        storeName:  'BP 2go West Melton',
        dot:        469
      },
      {
        storeName:  'BP 2go Mairehau',
        dot:        470
      },
      {
        storeName:  'BP 2go Westburn',
        dot:        471
      },
      {
        storeName:  'Robert Harris Cafe New Brighton',
        dot:        472
      },
      {
        storeName:  'Belle Cafe',
        dot:        473
      },
      {
        storeName:  'Robert Harris Cafe Hornby',
        dot:        484
      },
      {
        storeName:  'BP 2go Sockburn',
        dot:        485
      },
      {
        storeName:  'Robert Harris Cafe BNZ',
        dot:        486
      },
      {
        storeName:  'Robert Harris Cafe Christchurch',
        dot:        487
      },
      {
        storeName:  'Robert Harris Cafe Rolleston',
        dot:        501
      },
      {
        storeName:  'Robert Harris Cafe Lincoln',
        dot:        502
      },
      {
        storeName:  'BP 2go Fairlie',
        dot:        512
      },
      {
        storeName:  'Robert Harris Cafe Ashburton',
        dot:        514
      },
      {
        storeName:  'Robert Harris Cafe Timaru',
        dot:        528
      },
      {
        storeName:  'BP 2go Highfield',
        dot:        541
      },
      {
        storeName:  'The Exchange Cafe',
        dot:        577
      },
      {
        storeName:  'BP 2go Cromwell',
        dot:        579
      },
      {
        storeName:  'BP 2go Oamaru',
        dot:        586
      },
      {
        storeName:  'Robert Harris Cafe Botany Whitcoulls',
        dot:        604
      },
      {
        storeName:  'BP 2go Dunedin',
        dot:        648
      },
      {
        storeName:  'BP 2go Gore',
        dot:        660
      },
      {
        storeName:  'Alto Cafe',
        dot:        664
      },
      {
        storeName:  'BP 2go Balclutha',
        dot:        692
      },
      {
        storeName:  'BP 2go North Road',
        dot:        694
      },
      {
        storeName:  'BP 2go Ascot',
        dot:        695
      }
    ];

    this.container  = options.domElementContainer;
    this.canvas     = options.domElementCanvas;

    this.sizes      = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight
    };

    this.camera = new THREE.PerspectiveCamera(30, this.sizes.width / this.sizes.height, 1, 1000);
    this.camera.position.z = 80;

    this.scene = new THREE.Scene();
    
    this.renderer = new THREE.WebGLRenderer({
      canvas:     this.canvas,
      antialias:  false,
      alpha:      true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.raycaster      = new THREE.Raycaster();
    this.mouse          = new THREE.Vector2();
    this.cursor         = document.querySelector('.cursor');
    this.isIntersecting = false;

    this.time               = 0;
    this.twinkleTime        = 0.02;
    this.recentlyInteracted = false;
    this.allMaterials       = [];
    this.locationMaterials  = [];
    this.smallMaterial      = new THREE.ShaderMaterial({
      side:     THREE.DoubleSide,
      uniforms: {
        u_time:         { value: 1.0 },
        u_mouseDown:    { value: 0.0 },
        u_mouseUp:      { value: 0.0 }
      },
      vertexShader:   vertex,
      fragmentShader: smallFragment,
    });
    this.locationMaterial = new THREE.ShaderMaterial({
      side:     THREE.DoubleSide,
      uniforms: {
        u_time:         { value: 1.0 },
        u_mouseDown:    { value: 0.0 },
        u_mouseUp:      { value: 0.0 }
      },
      vertexShader:   vertex,
      fragmentShader: locationFragment,
    });

    this.light = new THREE.PointLight(0x081b26, 25, 200);
    this.light.position.set(-50, 0, 60);
    this.scene.add(this.light);

    this.createLabel();
    this.createGeometry();
    this.resize();
    this.listenTo();
    this.render();

  }

  createLabel() {

    this.labelRenderer = new CSS2DRenderer();
		this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
		this.container.appendChild(this.labelRenderer.domElement);

    this.locationLabelParent            = document.createElement('div');
		this.locationLabelParent.className  = 'label_container';
    this.locationLabelChild             = document.createElement('div');
		this.locationLabelChild.className   = 'label';
    this.locationLabelText              = document.createElement('p');
    this.locationLabelText.className    = 'label_p';
    this.locationLabelImg               = document.createElement('img');
    this.locationLabelImg.className     = 'label_img';
    this.locationLabelImg.src           = 'https://www.coffeestamp.co.nz/website/img/cs_logo.png';
    this.locationLabelImg.alt           = 'Coffee Stamp Logo';
    this.locationLabelParent.appendChild(this.locationLabelChild);
    this.locationLabelChild.appendChild(this.locationLabelImg);
    this.locationLabelChild.appendChild(this.locationLabelText);
		this.locationLabel                  = new CSS2DObject(this.locationLabelParent);

		this.scene.add(this.locationLabel);

  }

  createMaterial(timeValue, location) {

    let mat;

    if(!location) {
      mat = this.smallMaterial.clone();
      mat.uniforms.u_time.value = timeValue;
      this.allMaterials.push(mat);
    }
    else {
      mat = this.locationMaterial.clone();
      mat.uniforms.u_time.value = timeValue;
      this.allMaterials.push(mat);
      this.locationMaterials.push(mat);
    }
    return mat;

  }

  createGeometry() {

    this.allMeshesGroup = new THREE.Group();
    this.locationsGroup = new THREE.Group();

    this.baseSphere   = new THREE.SphereGeometry(19.5, 28, 28);
    this.baseMaterial = new THREE.MeshStandardMaterial({color: 0x081b26});
    this.baseMesh     = new THREE.Mesh(this.baseSphere, this.baseMaterial);
    this.allMeshesGroup.add(this.baseMesh);    

    this.image        = document.querySelector('.world_map');
    this.image.onload = () => {

      this.image.needsUpdate  = true;

      this.imageCanvas        = document.createElement('canvas');
      this.imageCanvas.width  = this.image.width;
      this.imageCanvas.height = this.image.height;
        
      this.context = this.imageCanvas.getContext('2d');
      this.context.drawImage(this.image, 0, 0);
        
      this.imageData = this.context.getImageData(0, 0, this.imageCanvas.width, this.imageCanvas.height);

      this.dotSphereRadius  = 20;
      this.vector           = new THREE.Vector3();
      this.dotAmount        = 0;

      for(let i = 0, lon = -360, lat = 180; i < this.imageData.data.length; i += 4, lon += 2) {

        const red   = this.imageData.data[i];
        const green = this.imageData.data[i + 1];
        const blue  = this.imageData.data[i + 2];

        if(red > 100 && green > 100 && blue > 100) {

          this.dotAmount++;

          this.vector = this.calcPosFromLatLonRad(lon, lat);

          let m;
          for(let x = 0; x < this.locations.length; x++) {
            if(this.dotAmount === this.locations[x].dot) {
              this.dotGeometry = new THREE.CircleGeometry(0.14, 10);
              this.dotGeometry.name = this.locations[x].storeName;
              m = this.createMaterial(i / 4, true);
              break;
            }
          }
          if(!m) {
            this.dotGeometry = new THREE.CircleGeometry(0.1, 5);
            m = this.createMaterial(i / 4, false);
          }

          this.dotGeometry.lookAt(this.vector);
          this.dotGeometry.translate(this.vector.x, this.vector.y, this.vector.z);

          this.mesh = new THREE.Mesh(this.dotGeometry, m);

          if(this.mesh.geometry.parameters.radius === 0.14) this.locationsGroup.add(this.mesh);
          else this.allMeshesGroup.add(this.mesh);
          
        }

        if(lon === 360) {
          lon  =  -360;
          lat -=  2;
        }

      }
      
    }

    this.locationsGroup.rotation.y = 4.65;
    this.allMeshesGroup.rotation.y = 4.65;

    this.scene.add(this.allMeshesGroup);
    this.scene.add(this.locationsGroup);

  }

  calcPosFromLatLonRad(lon, lat) {
  
    var phi   = (180 - lat) * (Math.PI / 360);
    var theta = (lon + 360) * (Math.PI / 360);

    const x = -(this.dotSphereRadius * Math.sin(phi) * Math.cos(theta));
    const z = (this.dotSphereRadius * Math.sin(phi) * Math.sin(theta));
    const y = (this.dotSphereRadius * Math.cos(phi));
  
    return new THREE.Vector3(x, y, z);

  }

  resize() {

    this.sizes = {
      width:  this.container.offsetWidth,
      height: this.container.offsetHeight
    }
  
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.labelRenderer.setSize(this.sizes.width, this.sizes.height);

  }

  mousemove(event) {

    this.isIntersecting = false;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    this.intersectsBaseMesh = this.raycaster.intersectObject(this.baseMesh);
    if(this.intersectsBaseMesh[0]) {
      this.isIntersecting = true;
      document.body.style.cursor = 'pointer';
    }
    else document.body.style.cursor = 'default';

    this.intersectsLocations = this.raycaster.intersectObject(this.locationsGroup);
    if(this.intersectsLocations[0]) {

      this.locationLabelText.textContent       = this.intersectsLocations[0].object.geometry.name;
      this.locationLabelParent.style.visibility = 'visible';

      this.locationLabel.position.set(this.intersectsLocations[0].point.x, this.intersectsLocations[0].point.y, this.intersectsLocations[0].point.z);

    }
    else this.locationLabelParent.style.visibility = 'hidden';

  }

  mousedown() {

    if(!this.isIntersecting || 
      this.allMaterials[this.allMaterials.length - 1].uniforms.u_mouseDown.value === 1.0) return;

    gsap.to(this.baseMesh.scale, {x: 0.95, y: 0.95, z: 0.95, duration: 1});

    this.allMaterials.forEach(el => {
      el.uniforms.u_mouseDown.value = 1.0;
    });

  }

  mouseup() {

    if(!this.isIntersecting || this.recentlyInteracted) return;

    this.recentlyInteracted = true;
    setTimeout(() => {
      this.recentlyInteracted = false;
    }, 1500);

    gsap.to(this.baseMesh.scale, {x: 1, y: 1, z: 1, duration: 1});

    this.allMaterials.forEach(el => {
      el.uniforms.u_mouseUp.value = 1.0;
      setTimeout(() => {
        el.uniforms.u_mouseDown.value = 0.0;
        el.uniforms.u_mouseUp.value = 0.0;
      }, 100);
    });

  }

  listenTo() {

    window.addEventListener('resize',     this.resize.bind(this));
    window.addEventListener('mousemove',  this.mousemove.bind(this));
    window.addEventListener('mousedown',  this.mousedown.bind(this));
    window.addEventListener('mouseup',    this.mouseup.bind(this));

  }

  locationAnimation() {

    const locationMaterial = this.locationMaterials[Math.floor(Math.random() * this.locationMaterials.length)];
    locationMaterial.uniforms.u_maxExtrusion.value = 1.2;
    setTimeout(() => {
      locationMaterial.uniforms.u_maxExtrusion.value = 1;
    }, 1000);

  }

  render() {

    this.time += 0.019;
    this.allMeshesGroup.position.y = Math.sin(this.time) * 0.4;
    this.locationsGroup.position.y = Math.sin(this.time) * 0.4;

    this.allMaterials.forEach(el => {
      el.uniforms.u_time.value += this.twinkleTime;
    });

    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));

  }

}

new Globe({
  domElementContainer:  document.querySelector('.container'),
  domElementCanvas:     document.querySelector('.canvas')
});