import React, { Component } from 'react';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import createStage from '../../share/stage.js';

import beagle from '../../share/beagle.obj';
import beagleMTL from '../../share/beagle.mtl';


export default class ThirdStop extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    let beagleWithStage = new THREE.Group();
    //load beagle
    let mtlLoader = new MTLLoader();
    let objLoader = new OBJLoader();
     
    mtlLoader.load(beagleMTL, (materials) => {
      materials.preload();

      objLoader.setMaterials(materials);
      objLoader.load(beagle, (object) => {
        object.scale.x = 100;
        object.scale.y = 100;
        object.scale.z = 100;

        object.position.y = 20;
        beagleWithStage.add(object);
      });
    });

    let stage = createStage(this.props.scene);
    beagleWithStage.add(stage);

    beagleWithStage.rotation.y = - Math.PI * 1 / 4;
    beagleWithStage.position.x = 3500;
    beagleWithStage.position.y = this.props.groundHeight + 230;
    beagleWithStage.position.z = -200;
    this.props.scene.add(beagleWithStage);
  }

  render() {
    return (
      <div id="third-stop"></div>
    );
  }
}