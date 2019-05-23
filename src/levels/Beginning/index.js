import React, { Component } from 'react';
import * as THREE from 'three';

import './index.css';

export default class Beginning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      stop: false
    };

    this.times = 0;
    this.walkTowardGate = this.walkTowardGate.bind(this);
  }

  componentDidMount() {
    let extrudeSettings = {
      steps: 5,
      depth: 250,
    };

    let shape = new THREE.Shape( );
    shape.moveTo( -1500, 600 );
    shape.lineTo( 1500, 600 );
    shape.bezierCurveTo(2000, 600, 2100, 630, 1800, 320);
    shape.quadraticCurveTo(1790, 280, 2000, 250);
    shape.quadraticCurveTo(2050, 215, 1900, 230);
    shape.bezierCurveTo(1700, 250, 2600, 150, 2050, -620);
    shape.bezierCurveTo(2000, -680, 2030, -730, 2050, -740);
    shape.bezierCurveTo(2100, -800, 2300, -880, 2000, -860);
    shape.lineTo( -1500, -860 );
    shape.bezierCurveTo(-2100, -850, -1850, -700, -1800, -600);
    shape.bezierCurveTo(-1800, -520, -1950, -530, -2000, -530);
    shape.bezierCurveTo(-2300, -500, -2000, -300, -1900, -200);
    shape.quadraticCurveTo(-1930, -100, -1850, 30);
    shape.quadraticCurveTo(-1930, 50, -1800, 70);
    shape.bezierCurveTo(-1950, 200, -1900, 230, -1800, 200);
    shape.bezierCurveTo(-2150, 550, -2000, 620, -1500, 600);

   
    let geometryBoard = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    let meshBoard = new THREE.Mesh( geometryBoard );
    meshBoard.updateMatrix();

    let geometryPillarR = new THREE.CylinderGeometry( 100, 200, 5000, 9 );
    let cylinderPillarR = new THREE.Mesh( geometryPillarR );
    cylinderPillarR.position.x = 1500;
    cylinderPillarR.position.y = -1300;
    cylinderPillarR.position.z = 50;
    cylinderPillarR.updateMatrix();

    let geometryPillarL = new THREE.CylinderGeometry( 100, 200, 5000, 9 );
    let cylinderPillarL = new THREE.Mesh( geometryPillarL );
    cylinderPillarL.position.x = -1500;
    cylinderPillarL.position.y = -1300;
    cylinderPillarL.position.z = 50;
    cylinderPillarL.updateMatrix();

    let geometryGate = new THREE.Geometry();
    geometryGate.merge(meshBoard.geometry, meshBoard.matrix);
    geometryGate.merge(cylinderPillarR.geometry, cylinderPillarR.matrix);
    geometryGate.merge(cylinderPillarL.geometry, cylinderPillarL.matrix);
    let materialGate = new THREE.MeshLambertMaterial( {color: 0xda77ff} );
    let meshGate = new THREE.Mesh(geometryGate, materialGate);
    meshGate.position.y = (3800 + this.props.groudHeight);
    meshGate.position.z = 8000;
    this.props.scene.add( meshGate );
  }

  walkTowardGate() {
    this.setState({
      clicked: true
    });

    this.times += 1;console.log(this.times);
    this.animation = requestAnimationFrame( this.walkTowardGate );
    
    if(this.times < 130) {
      let direction = new THREE.Vector3();
      this.props.camera.getWorldDirection(direction);

      this.props.camera.position.add(direction.multiplyScalar(3));
    } else if(this.times >= 140 && this.times <= 250) {
      this.props.camera.rotateX(Math.PI / 500);
    } else if(this.times > 250) {
      this.setState({
        stop: true
      });
      return cancelAnimationFrame( this.animation );
    }    
  }

  render() {
    return(
      <div id="beginning" onClick={this.walkTowardGate}>
        {!this.state.clicked ?
          <h1>Click to begin !</h1> :
          null
        }
        {this.state.stop ?
          <h1 className="short">Welcome to LingLingLand !</h1> :
          null
        }
      </div>
    );
  }
}