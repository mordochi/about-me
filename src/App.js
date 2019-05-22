import React, { Component } from 'react';
import * as THREE from 'three';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.addLight = this.addLight.bind(this);
    this.addSky = this.addSky.bind(this);
    this.addPlane = this.addPlane.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('app').appendChild( this.renderer.domElement );

    let axesHelper = new THREE.AxesHelper( 1000 );
    this.scene.add( axesHelper );
    
    this.camera.position.y = 180;
    this.camera.position.z = 500;


    this.addLight();
    this.addSky();
    this.addPlane();
    this.animate();
  }

  addLight() {
    let hemiLight = new THREE.HemisphereLight(0xff6262, 0xffffff);
    hemiLight.position.set( 700, 3000, 0 );
    this.scene.add( hemiLight );
    //let hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    //this.scene.add( hemiLightHelper );

    let dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set( 5000, 5000, 0 );
    this.scene.add( dirLight );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    // var d = 50;
    // dirLight.shadow.camera.left = - d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = - d;
    // dirLight.shadow.camera.far = 3500;
    // dirLight.shadow.bias = - 0.0001;
    // let dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
    // this.scene.add( dirLightHeper );
  }

  addSky() {
    var skyGeo = new THREE.SphereGeometry(10000, 32, 32);
    var material = new THREE.MeshLambertMaterial( {color: 0xffe982} );
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    this.scene.add(sky);
  }

  addPlane() {//color :rgb(255,191,99)
    let geometry = new THREE.PlaneGeometry( 20000, 20000 );
    let material = new THREE.MeshLambertMaterial( { color: 0xffbf63 } );
    let plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = - Math.PI / 2;
    plane.position.x = 0;
    plane.position.y = -50;
    plane.position.z = 0;
    plane.receiveShadow = true;
    this.scene.add( plane );
  }

  animate() {
    this.renderer.render( this.scene, this.camera );
  }

  render() {
    return (
      <div id="app"></div>
    );
  }
}

