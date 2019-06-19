import * as THREE from 'three';

export default function createMordecai(scene) {
  //head
  let geometryHead = new THREE.SphereGeometry( 200, 32, 32 );
  let materialHead = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let sphereHead = new THREE.Mesh( geometryHead, materialHead );

  //blue
  let geometryHeadBlueTop = new THREE.SphereGeometry( 202, 120, 120 );
  for (var i = 0; i < geometryHeadBlueTop.vertices.length; i++) {
    var vertex = geometryHeadBlueTop.vertices[i];
    if (vertex.y <= 30) {
      vertex.x = 0;
      vertex.y = 30;
      vertex.z = 0;
    }
  }

  geometryHeadBlueTop.computeFaceNormals();
  geometryHeadBlueTop.computeVertexNormals();

  let materialHeadBlueTop = new THREE.MeshLambertMaterial( {color: 0x00a4db} );
  let sphereHeadBlueTop = new THREE.Mesh( geometryHeadBlueTop, materialHeadBlueTop );

  let geometryHeadBlueBottom = new THREE.SphereGeometry( 202, 120, 120 );
  for (var i = 0; i < geometryHeadBlueBottom.vertices.length; i++) {
    var vertex = geometryHeadBlueBottom.vertices[i];
    if (vertex.y <= -40) {
      vertex.y = -40;
    }
  }

  geometryHeadBlueBottom.computeFaceNormals();
  geometryHeadBlueBottom.computeVertexNormals();

  let materialHeadBlueBottom = new THREE.MeshLambertMaterial( {color: 0x00a4db} );
  let sphereHeadBlueBottom = new THREE.Mesh( geometryHeadBlueBottom, materialHeadBlueBottom );
  sphereHeadBlueBottom.rotation.x = - Math.PI * 4 / 18;

  let blue = new THREE.Group();
  blue.add(sphereHeadBlueTop);
  blue.add(sphereHeadBlueBottom);

  //black
  let extrudeSettingsHeadBlack = {
    steps: 1,
    depth: 30,
    bevelEnabled: false
  };

  let shapeHeadBlack = new THREE.Shape( );
  shapeHeadBlack.moveTo(-70, 30);
  shapeHeadBlack.lineTo(-70, -30);
  shapeHeadBlack.bezierCurveTo(-30, -10, 50, -100, 65, 0);
  shapeHeadBlack.bezierCurveTo(50, 100, -30, 10, -65, 30);

  let geometryHeadBlack = new THREE.ExtrudeGeometry( shapeHeadBlack, extrudeSettingsHeadBlack );
  let materialHeadBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let meshHeadBlack = new THREE.Mesh( geometryHeadBlack, materialHeadBlack );
  meshHeadBlack.rotation.z = Math.PI / 17;

  let headBlackR = meshHeadBlack.clone();
  headBlackR.rotation.y = Math.PI * 16 / 36;
  headBlackR.position.x = 175;
  headBlackR.position.y = -7;

  let headBlackL = meshHeadBlack.clone();
  headBlackL.rotation.y = Math.PI * 20 / 36;
  headBlackL.position.x = -206;
  headBlackL.position.y = -7;

  let headBlack = new THREE.Group();
  headBlack.add(headBlackR);
  headBlack.add(headBlackL);

  //cone
  let geometryConeTop = new THREE.ConeGeometry( 170, 270, 32 );
  let materialConeTop = new THREE.MeshLambertMaterial( {color: 0x00a4db} );
  let coneTop = new THREE.Mesh( geometryConeTop, materialConeTop );
  coneTop.rotation.x = - Math.PI / 5;
  coneTop.position.y = 190;
  coneTop.position.z = -140;

  let geometryConeBottom = new THREE.ConeGeometry( 90, 220, 32 );
  let materialConeBottom = new THREE.MeshLambertMaterial( {color: 0x00a4db} );
  let coneBottom = new THREE.Mesh( geometryConeBottom, materialConeBottom );
  coneBottom.rotation.x = - Math.PI * 5 / 18;
  coneBottom.position.y = 25;
  coneBottom.position.z = -190;

  //eye
  let geometryEye = new THREE.CylinderGeometry( 40, 40, 30, 32, 32 );
  let materialEye = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let cylinderEye = new THREE.Mesh( geometryEye, materialEye );
  cylinderEye.rotation.x = Math.PI / 2;

  let geometryEyeBlack = new THREE.CylinderGeometry( 10, 10, 31, 32, 32 );
  let materialEyeBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderEyeBlack = new THREE.Mesh( geometryEyeBlack, materialEyeBlack );
  cylinderEyeBlack.rotation.x = Math.PI / 2;
  cylinderEyeBlack.position.z = 2.4;

  let eye = new THREE.Group();
  eye.add(cylinderEye);
  eye.add(cylinderEyeBlack);

  let eyeR = eye.clone();
  eyeR.rotation.x = - Math.PI / 20;
  eyeR.rotation.y = Math.PI / 15;
  eyeR.position.x = 40;
  eyeR.position.y = 40;
  eyeR.position.z = 180;

  let eyeL = eye.clone();
  eyeL.rotation.x = - Math.PI / 20;
  eyeL.rotation.y = - Math.PI / 15;
  eyeL.position.x = -40;
  eyeL.position.y = 40;
  eyeL.position.z = 180;

  //mouth
  let geometryMouth = new THREE.ConeGeometry( 50, 45, 32 );
  geometryMouth.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, 4 ) );
  let materialMouth = new THREE.MeshBasicMaterial( {color: 0x2f2f2f} );
  let coneMouth = new THREE.Mesh( geometryMouth, materialMouth );

  let mouthTop = coneMouth.clone();
  mouthTop.position.y = 0;
  mouthTop.position.z = 200;

  let mouthBottom = coneMouth.clone();
  mouthBottom.applyMatrix( new THREE.Matrix4().makeScale( 0.9, 0.9, 1 ) );
  mouthBottom.rotation.z = Math.PI;
  mouthBottom.position.y = -40;
  mouthBottom.position.z = 180;
 
  let mordecai = new THREE.Group();
  mordecai.add(sphereHead);
  mordecai.add(blue);
  mordecai.add(coneTop);
  mordecai.add(coneBottom);
  mordecai.add(eyeR);
  mordecai.add(eyeL);
  mordecai.add(mouthTop);
  mordecai.add(mouthBottom);
  mordecai.add(headBlack);

  return mordecai;
}