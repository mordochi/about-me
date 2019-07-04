import * as THREE from 'three';

export default function createGate(scene) {
  let gate = new THREE.Group();
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
    gate.add(planetName);
  });
  
  gate.add(meshBoard);
  gate.add(cylinderPillarR);
  gate.add(cylinderPillarL);

  return gate;
}