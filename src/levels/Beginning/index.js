import React, { Component } from 'react';
import * as THREE from 'three';

import './index.css';

export default class Beginning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      showModal: true,
      stop: false,
      textTyping: ''
    };

    this.times = 0;
    this.addNameToGate = this.addNameToGate.bind(this);
    this.begin = this.begin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.collectName = this.collectName.bind(this);
    this.walkTowardGate = this.walkTowardGate.bind(this);
  }

  componentDidMount() {
    this.gate = new THREE.Group();
    let materialGate = new THREE.MeshLambertMaterial( {color: 0xda77ff} );

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
    let meshBoard = new THREE.Mesh( geometryBoard, materialGate );


    let geometryPillarR = new THREE.CylinderGeometry( 100, 200, 5000, 9 );
    let cylinderPillarR = new THREE.Mesh( geometryPillarR, materialGate );
    cylinderPillarR.position.x = 1500;
    cylinderPillarR.position.y = -1300;
    cylinderPillarR.position.z = 50;


    let geometryPillarL = new THREE.CylinderGeometry( 100, 200, 5000, 9 );
    let cylinderPillarL = new THREE.Mesh( geometryPillarL, materialGate );
    cylinderPillarL.position.x = -1500;
    cylinderPillarL.position.y = -1300;
    cylinderPillarL.position.z = 50;

    let loader = new THREE.FontLoader();
    loader.load(process.env.PUBLIC_URL + '/GenYoGothicMedium_Regular.json', (font) => {
      let geometryPlanetName = new THREE.TextGeometry('Ling Ling Land', {
        font: font,
        size: 360,
        height: 40,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });

      geometryPlanetName.computeBoundingBox();

      let materialPlanetName = new THREE.MeshLambertMaterial({color: 0xffffff});
      let planetName = new THREE.Mesh(geometryPlanetName, materialPlanetName );
      planetName.position.x = - 0.5 * ( geometryPlanetName.boundingBox.max.x - geometryPlanetName.boundingBox.min.x );
      planetName.position.y = -210;
      planetName.position.z = 250;
      this.gate.add(planetName);
    });
    
    this.gate.add(meshBoard);
    this.gate.add(cylinderPillarR);
    this.gate.add(cylinderPillarL);
    this.gate.position.y = (3000 + this.props.groundHeight);
    this.gate.position.z = 7800;

    this.props.scene.add(this.gate);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  addNameToGate() {
    let loader = new THREE.FontLoader();
    loader.load(process.env.PUBLIC_URL + '/GenYoGothicMedium_Regular.json', (font) => {
      let geometryVisitor = new THREE.TextGeometry(`v i s i t o r :  ${this.props.name.split('').join(' ')}`, {
        font: font,
        size: 180,
        height: 40,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      });

      geometryVisitor.computeBoundingBox();

      let materialVisitor = new THREE.MeshLambertMaterial({color: 0xffffff});
      let visitor = new THREE.Mesh(geometryVisitor, materialVisitor );
      visitor.position.x = - 0.5 * ( geometryVisitor.boundingBox.max.x - geometryVisitor.boundingBox.min.x );
      visitor.position.y = -610;
      visitor.position.z = 250;
      this.gate.add(visitor);

      this.walkTowardGate();
    });
  }

  begin() {
    if(this.state.clicked) return;

    this.setState({ 
      clicked: true,
      showModal: true
    }, () => {
      let text = '歡迎來到 Ling Ling Land ，接下來迎接您的將會是一趟奇幻的旅程！在這之前請問您的大名是？';
      let index = 0;
      
      //typing
      this.interval = setInterval(() => {
        if(index < text.split('').length) {
          this.setState({
            textTyping: this.state.textTyping + text.split('')[index]
          }, () => {
            index++;
          });
        } else {
          clearInterval(this.interval);
        }
      }, 150);
    });
  }

  handleChange(e) {
    e.preventDefault();

    this.props.collectName(e.target.value);
  }

  collectName() {
    this.setState({ showModal: false }, () => {
      this.addNameToGate();
    });
  }

  walkTowardGate() {
    if(this.props.level !== 0) return;
    this.setState({
      clicked: true
    });

    this.times += 1;
    this.animation = requestAnimationFrame( this.walkTowardGate );

    if(this.times < 130) {
      let direction = new THREE.Vector3();
      this.props.camera.getWorldDirection(direction);

      this.props.camera.position.add(direction.multiplyScalar(6));
    } else if(this.times >= 140 && this.times <= 250) {
      this.props.camera.rotateX(Math.PI / 510);
    } else if(this.times > 250 && this.times < 300) {
      this.setState({
        stop: true
      });      
    } else if(this.times >= 300 && this.times <= 410) {
      this.setState({
        stop: false
      }, () => {
        this.props.camera.rotateX(- Math.PI / 510);
      });
    } else if(this.times > 410) {
      this.props.levelUp();
      return cancelAnimationFrame( this.animation );
    } 
  }

  render() {
    return(
      <div id="beginning" onClick={this.begin}>
        {!this.state.clicked ?
          <h1 className="click">點擊畫面</h1> :
          null
        }

        {this.state.showModal ? 
          <div className="modal">
            <div className="modal-inner">
              <div><p>{this.state.textTyping}</p></div>
              <input value={this.state.name} onChange={this.handleChange}/>
              <button onClick={this.collectName} disabled={this.props.name === ''}><span>完成</span></button>
            </div>
          </div> :
          null
        }

        {this.state.stop ?
          <h1 className="welcome-message">Welcome To LingLingLand !</h1> :
          null
        }
      </div>
    );
  }
}