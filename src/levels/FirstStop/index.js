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

  leadToBillboard() {
    this.animation = requestAnimationFrame( this.leadToBillboard );

    let direction = new THREE.Vector3();
    this.props.camera.getWorldDirection(direction);

    if(this.props.camera.position.z >= 5550) {
      this.props.camera.position.add(direction.multiplyScalar(10));
    } else {
      document.querySelector('.introduction').className += ' show-text';
      return cancelAnimationFrame( this.animation );
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
        <p className="introduction">hello hello hello hello hello hello hello hello hello hello
         hello hello hello hello hello hello hello hello hello hello hello hello hello hello 
         hello hello hello hello hello hello hello hello hello hello hello hello</p>
      </div>
    );
  }
}