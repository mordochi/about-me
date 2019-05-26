import React, { Component } from 'react';
import * as THREE from 'three';

import createBillboard from '../../share/billboard';

import './index.css';

export default class firstStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.leadToBillboard = this.leadToBillboard.bind(this);
  }

  componentDidMount() {
    let billboard = createBillboard(this.props.scene, 0xffffff, 0x2d34ff);
    billboard.position.x = 3000;
    billboard.position.y = this.props.groundHeight + 500;
    billboard.position.z = 5500;
    billboard.rotation.y = - Math.PI / 2;
    this.props.scene.add(billboard);
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

    this.props.camera.position.add(direction.multiplyScalar(3));
  }

  render() {
    return(
      <div id="first-stop">
        
      </div>
    );
  }
}