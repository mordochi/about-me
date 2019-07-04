import React, { Component } from 'react';
import * as THREE from 'three';

import createBillboard from '../../share/billboard';
import createMascot from '../../share/mascot';

import './index.css';


export default class firstStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.flowUp = true;
    this.nextStop = this.nextStop.bind(this);
    this.leadToBillboard = this.leadToBillboard.bind(this);
  }

  componentDidMount() {
    let billboard = createBillboard(this.props.scene, 0xffffff, 0xd85006);
    billboard.position.x = 3000;
    billboard.position.y = this.props.groundHeight + 500;
    billboard.position.z = 5500;
    billboard.rotation.y = - Math.PI / 2;
    this.props.scene.add(billboard);

    this.mascot = createMascot(this.props.scene, 0x383737);
    this.mascot.rotation.y = - Math.PI / 3.3;
    this.mascot.position.x = 2750;
    this.mascot.position.y = this.props.groundHeight + 420;
    this.mascot.position.z = 5400;
    
    this.props.scene.add(this.mascot);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.level !== this.props.level && this.props.level === 1) {
      this.leadToBillboard();
    }
  }

  nextStop() {
    this.props.levelUp();
    return cancelAnimationFrame( this.animation );
  }

  leadToBillboard() {
    this.animation = requestAnimationFrame( this.leadToBillboard );

    let direction = new THREE.Vector3();
    this.props.camera.getWorldDirection(direction);

    if(this.props.camera.position.z >= 5550) {
      this.props.camera.position.add(direction.multiplyScalar(10));
    } else {
      if(!document.querySelector('.introduction').className.includes('show-text')) {
        document.querySelector('.introduction').className += ' show-text';
        document.querySelector('.arrow').className += ' appear';
      }
    }
   
    if(this.props.camera.position.z <= 8100 && this.props.camera.position.z >= 7500) {
      this.props.camera.rotateY( - Math.PI / 300 );
    }

    if(this.props.camera.position.z <= 6000 && this.props.camera.position.z >= 5740) {
      this.props.camera.rotateY( - Math.PI / 240 );
    }


    if(this.flowUp && this.mascot.position.y <= (this.props.groundHeight + 425)) {
      this.mascot.position.add(new THREE.Vector3(0, 0.1, 0));

      if(this.mascot.position.y > (this.props.groundHeight + 425)) this.flowUp = false;
    } else if(!this.flowUp && this.mascot.position.y >= (this.props.groundHeight + 415)) {
      this.mascot.position.add(new THREE.Vector3(0, -0.1, 0));

      if(this.mascot.position.y < (this.props.groundHeight + 415)) this.flowUp = true;
    }
  }

  render() {
    return(
      <div id="first-stop">
        <p className="introduction">你好，{this.props.name}，我是這個星球的創造者。
          這個星球主要是由一些我喜歡的東西所組成的，接下來我將帶領你探索這個星球，
          在觀賞景點的同時我會更仔細地向你介紹我。希望能帶給你有趣的旅程並讓你更認識我！</p>
        <div className="arrow" onClick={this.nextStop}></div>
      </div>
    );
  }
}