import React, { Component } from 'react';
import * as THREE from 'three';

import createIceCreamVan from '../../share/iceCreamVan';

import './index.css';

export default class secondStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.leadToIceCreamVan = this.leadToIceCreamVan.bind(this);
  }

  componentDidMount() {
    let iceCreamVan = createIceCreamVan(this.props.scene, 0xffffff, 0x2d34ff);
    iceCreamVan.rotation.y = Math.PI * 9 / 14;
    iceCreamVan.position.x = -4000;
    iceCreamVan.position.y = this.props.groundHeight + 600;
    iceCreamVan.position.z = 4000;
    
    this.props.scene.add(iceCreamVan);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.level !== this.props.level && this.props.level === 1) {
      this.leadToIceCreamVan();
    }
  }

  leadToIceCreamVan() {
    this.animation = requestAnimationFrame( this.leadToIceCreamVan );
  }

  render() {
    return(
      <div id="second-stop">
      </div>
    );
  }
}