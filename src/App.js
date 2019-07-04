import React, { Component } from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import './App.css';

import Beginning from './levels/Beginning';
import FirstStop from './levels/FirstStop';
import SecondStop from './levels/SecondStop';
import ThirdStop from './levels/ThirdStop';
import FourthStop from './levels/FourthStop';

import createTree from './share/tree';
import createMascot from './share/mascot';

import rangerSign from './assets/rangerSign.png';

let GROUND_POSITION_Y = 0; 

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      level: 0,
      name: '',
    };

    this.addLight = this.addLight.bind(this);
    this.addSky = this.addSky.bind(this);
    this.addPlane = this.addPlane.bind(this);
    this.addMountain = this.addMountain.bind(this);
    this.windowResize = this.windowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.collectName = this.collectName.bind(this);
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('app').appendChild( this.renderer.domElement );

    this.camera.position.set( 0, (420 + GROUND_POSITION_Y), 10000 );
    
    //this.controls = new OrbitControls( this.camera );
    //this.controls.update();
    
    let axesHelper = new THREE.AxesHelper( 1000 );
    this.scene.add( axesHelper );

    this.addLight();
    this.addSky();
    this.addPlane();
    this.addMountain();
    //this.addTree();
    window.addEventListener( 'resize', this.windowResize, false );
    this.animate();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.done !== this.state.done && this.state.done) {
      document.querySelectorAll('#app > div')[this.state.level].className += ' top';
    }

    if(prevState.level !== this.state.level) {
      document.querySelectorAll('#app > div')[this.state.level].className += ' top';
    }
  }

  addLight() {
    let hemiLight = new THREE.HemisphereLight(0xff6262, 0xffffff);
    hemiLight.position.set( 700, 3000, 0 );
    this.scene.add( hemiLight );
    let hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    this.scene.add( hemiLightHelper );

    let dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set( 5000, 5000, 0 );
    this.scene.add( dirLight );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 50;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
    let dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
    this.scene.add( dirLightHeper );
  }

  addSky() {
    var skyGeo = new THREE.SphereGeometry(10000, 32, 32);
    var material = new THREE.MeshLambertMaterial( {color: 0xffe982} );
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    sky.position.y = GROUND_POSITION_Y;
    this.scene.add(sky);
  }

  addPlane() {
    let geometry = new THREE.BoxGeometry( 20000, 20000, 200, 40, 40 );

    for (var i = 0; i < geometry.vertices.length; i++) {
      var vertex = geometry.vertices[i];
      if (vertex.z > 0)
        vertex.z += Math.random() * 200;
        vertex.x += Math.random() * 500;
        vertex.y += Math.random() * 500; 
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    let material = new THREE.MeshLambertMaterial( { color: 0xffbf63, side: THREE.DoubleSide, shading: THREE.FlatShading, } );
    let plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = - Math.PI / 2;
    plane.position.x = 0;
    plane.position.y = GROUND_POSITION_Y - 20;
    plane.position.z = 0;
    plane.receiveShadow = true;

    this.scene.add( plane );
  }

  addMountain() {
    let geometry1 = new THREE.CylinderGeometry( 1000, 3000, 1200, 9 );
    let material = new THREE.MeshLambertMaterial( { color: 0xffbf63 } );
    let mountain1 = new THREE.Mesh( geometry1, material );
    mountain1.position.x = -5500;
    mountain1.position.y = 500;
    mountain1.position.z = -1500;
    this.scene.add( mountain1 );

    let geometry2 = new THREE.CylinderGeometry( 700, 2000, 720, 9 );
    let mountain2 = new THREE.Mesh( geometry2, material );
    mountain2.position.x = 4500;
    mountain2.position.y = 300;
    mountain2.position.z = -4500;

    let geometry3 = new THREE.CylinderGeometry( 200, 1000, 720, 9 );
    let mountain3 = new THREE.Mesh( geometry3, material );
    mountain3.position.x = 2000;
    mountain3.position.y = 300;
    mountain3.position.z = 7000;

    this.scene.add(mountain1);
    this.scene.add(mountain2);
    this.scene.add(mountain3);
  }

  addTree() {
    for(let i = 0; i < 70; i++) {
      let xPositiveOrNot = Math.floor((Math.random() * 2));
      let x = xPositiveOrNot ? Math.floor((Math.random() * 2800)) : - Math.floor((Math.random() * 3200));
      let zPositiveOrNot = Math.floor((Math.random() * 2));
      let z = zPositiveOrNot ? (- (0.483 * x) - 3000) + Math.floor((Math.random() * 1500)) : (- (0.483 * x) - 3000) - Math.floor((Math.random() * 1500));

      let tree = createTree(this.scene);
      tree.position.x = x;
      tree.position.y = GROUND_POSITION_Y + 170;
      tree.position.z = z;

      this.scene.add(tree);
    }

    for(let i = 0; i < 10; i++) {
      let xPositiveOrNot = Math.floor((Math.random() * 2));
      let x = xPositiveOrNot ? Math.floor((Math.random() * 7000)) : - Math.floor((Math.random() * 7000));
      let zPositiveOrNot = Math.floor((Math.random() * 2));
      let z = zPositiveOrNot ? Math.floor((Math.random() * 7000)) : - Math.floor((Math.random() * 7000));

      let tree = createTree(this.scene);
      tree.position.x = x;
      tree.position.y = GROUND_POSITION_Y + 170;
      tree.position.z = z;

      this.scene.add(tree);
    }

    let ranger = createMascot(this.scene, 0xe8cb63, 'angry', 'hold');
    ranger.position.y = GROUND_POSITION_Y + 420;
    

    let loader = new THREE.TextureLoader();
    let material = new THREE.MeshLambertMaterial({
      map: loader.load(rangerSign)
    });
    let materials = [
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
      new THREE.MeshLambertMaterial({ map: loader.load(rangerSign)}),
      new THREE.MeshLambertMaterial({ color: 0xffffff }),
    ];
    let geometry = new THREE.BoxGeometry(40, 25, 3);
    let meshRangerSign = new THREE.Mesh(geometry, materials);
    meshRangerSign.position.y = GROUND_POSITION_Y + 390;
    meshRangerSign.position.z = 25;

    let rangerGroup = new THREE.Group();
    rangerGroup.add(ranger);
    rangerGroup.add(meshRangerSign);
    rangerGroup.position.z = -1500;
    this.scene.add(rangerGroup);
  }

  windowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate() {
    requestAnimationFrame( this.animate );
    //this.controls.update();
    
    this.renderer.render( this.scene, this.camera );
    this.setState({
      done: true
    });
  }

  levelUp() {
    this.setState({
      level: this.state.level + 1
    });
  }

  collectName(name) {
    this.setState({ name });
  }

  render() {
    let props = {
      scene: this.scene, 
      camera: this.camera, 
      groundHeight: GROUND_POSITION_Y, 
      levelUp: this.levelUp, 
      collectName: this.collectName
    };

    return (
      <div id="app">
        {this.state.done ? 
          <React.Fragment>
            <Beginning {...props} {...this.state} />
            <FirstStop {...props} {...this.state} />
            <SecondStop {...props} {...this.state} />
            <ThirdStop {...props} {...this.state} />
            <FourthStop {...props} {...this.state} />
          </React.Fragment> : 
          null
        }
      </div>
    );
  }
}

