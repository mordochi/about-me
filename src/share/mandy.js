import * as THREE from 'three';

export default function createMandy(scene) {
  //head
  let geometryHead = new THREE.SphereGeometry( 200, 32, 32 );
  let materialHead = new THREE.MeshLambertMaterial( {color: 0xffcfaa} );
  let sphereHead = new THREE.Mesh( geometryHead, materialHead );

  //hair
  let geometryHair = new THREE.SphereGeometry( 205, 32, 32 );
  let materialHair = new THREE.MeshLambertMaterial( {color: 0xffff00} );
  let sphereHair = new THREE.Mesh( geometryHair, materialHair );

  //cone
  let geometryCone = new THREE.ConeGeometry( 70, 125, 32 );
  for (let i = 0; i < geometryCone.vertices.length; i++) {
    let vertex = geometryCone.vertices[i];
    if (vertex.y >= 0) {
      vertex.x = 155;
    }
  }

  geometryCone.computeFaceNormals();
  geometryCone.computeVertexNormals();
  
  geometryCone.applyMatrix( new THREE.Matrix4().makeScale( 0.6, 1, 1.5 ) );
  let materialCone = new THREE.MeshLambertMaterial( {color: 0xffff00} );
  let cone = new THREE.Mesh( geometryCone, materialCone );

  let coneR = cone.clone();
  coneR.rotation.y = Math.PI;
  coneR.rotation.z = Math.PI / 13;
  coneR.position.x = 140;
  coneR.position.y = 170;
  
  let coneL = cone.clone();
  coneL.rotation.z = Math.PI / 13;
  coneL.position.x = -140;
  coneL.position.y = 170;

  //bangs
  let extrudeSettingsBangs = {
    steps: 1,
    depth: 30,
    bevelEnabled: false
  };

  let shapeBangs = new THREE.Shape( );
  shapeBangs.moveTo( 18, -7 );
  shapeBangs.quadraticCurveTo(60, -40, 150, -30);
  shapeBangs.quadraticCurveTo(100, 40, 6, 20);

  let geometryBangs = new THREE.ExtrudeGeometry( shapeBangs, extrudeSettingsBangs );
  let materialBangs = new THREE.MeshLambertMaterial( {color: 0xffff00} );
  let meshBangs = new THREE.Mesh( geometryBangs, materialBangs );

  let meshBangsR = meshBangs.clone();
  meshBangsR.rotation.x = - Math.PI / 4;
  meshBangsR.rotation.y = Math.PI / 8;

  let meshBangs2 = meshBangs.clone();
  meshBangs2.rotation.x = - Math.PI / 4.5;
  meshBangs2.rotation.y = - Math.PI / 70;
  meshBangs2.position.x = -85;
  meshBangs2.position.y = -5;
  meshBangs2.position.z = -5;

  let bangs = new THREE.Group();
  bangs.add(meshBangsR);
  bangs.add(meshBangs2);
  bangs.position.x = 20;
  bangs.position.y = 130;
  bangs.position.z = 130;

  //head band
  let geometryHeadBand = new THREE.CylinderGeometry( 190, 195, 25, 32 );
  let materialHeadBand = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderHeadBand = new THREE.Mesh( geometryHeadBand, materialHeadBand );
  cylinderHeadBand.rotation.x = Math.PI * 10.5 / 18;
  cylinderHeadBand.position.y = 5;
  cylinderHeadBand.position.z = 55;

  let hair = new THREE.Group();
  hair.add(sphereHair);
  hair.add(coneR);
  hair.add(coneL);
  hair.add(cylinderHeadBand);
  hair.add(bangs);
  hair.position.y = 10;
  hair.position.z = -20;

  //ear
  let geometryEar = new THREE.SphereGeometry( 45, 16, 16 );
  geometryEar.applyMatrix( new THREE.Matrix4().makeScale( 0.8, 1.15, 0.5 ) );
  let materialEar = new THREE.MeshLambertMaterial( {color: 0xffcfaa} );
  let sphereEar = new THREE.Mesh( geometryEar, materialEar );

  let sphereEarR = sphereEar.clone();
  sphereEarR.rotation.z = - Math.PI / 18;
  sphereEarR.position.x = 205;
  sphereEarR.position.y = 20;
  sphereEarR.position.z = 30;

  let sphereEarL = sphereEar.clone();
  sphereEarL.rotation.z = Math.PI / 18;
  sphereEarL.position.x = -205;
  sphereEarL.position.y = 20;
  sphereEarL.position.z = 30;

  //eye
  let extrudeSettingsEye = {
    steps: 1,
    depth: 20,
    bevelEnabled: false
  };

  let shapeEye = new THREE.Shape( );
  shapeEye.moveTo( -60, 0 );
  shapeEye.lineTo(60, 25);
  shapeEye.quadraticCurveTo(3, -80, -60, 0);

  let geometryEye = new THREE.ExtrudeGeometry( shapeEye, extrudeSettingsEye );
  let materialEye = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let meshEye = new THREE.Mesh( geometryEye, materialEye );
  meshEye.position.z = -10;

  let geometryEyeBlack = new THREE.CylinderGeometry( 18, 18, 22, 32 );
  let materialEyeBlack = new THREE.MeshBasicMaterial( {color: 0x000000} );
  let cylinderEyeBlack = new THREE.Mesh( geometryEyeBlack, materialEyeBlack );
  cylinderEyeBlack.rotation.x = Math.PI / 2;
  cylinderEyeBlack.position.x = -10;
  cylinderEyeBlack.position.y = 0;

  let geometryEyebrow = new THREE.BoxGeometry( 130, 22, 22 );
  let materialEyebrow = new THREE.MeshBasicMaterial( {color: 0x000000} );
  let cubeEyebrow = new THREE.Mesh( geometryEyebrow, materialEyebrow );
  cubeEyebrow.rotation.z = Math.PI / 13; 
  cubeEyebrow.position.y = 20;

  let eye = new THREE.Group();
  eye.add(meshEye);
  eye.add(cylinderEyeBlack);
  eye.add(cubeEyebrow);

  let eyeR = eye.clone();
  eyeR.rotation.x = - Math.PI / 10;
  eyeR.rotation.y = Math.PI / 9;
  eyeR.position.x = 70;
  eyeR.position.y = 60;
  eyeR.position.z = 170;

  let eyeL = eye.clone();
  eyeL.rotation.y = Math.PI * 8 / 9;
  eyeL.rotation.x = - Math.PI / 10;
  eyeL.position.x = -70;
  eyeL.position.y = 60;
  eyeL.position.z = 170;

  //mouth
  let extrudeSettingsMouth = {
    steps: 1,
    depth: 30,
    bevelEnabled: false
  };

  let shapeMouth = new THREE.Shape( );
  shapeMouth.moveTo( 0, 0 );
  shapeMouth.quadraticCurveTo(38, 30, 60, 10);
  shapeMouth.quadraticCurveTo(38, 25, -2, -5);

  let geometryMouth = new THREE.ExtrudeGeometry( shapeMouth, extrudeSettingsMouth );
  let materialMouth = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let meshMouth = new THREE.Mesh( geometryMouth, materialMouth );
  meshMouth.rotation.y = Math.PI / 20;
  meshMouth.rotation.x = Math.PI / 20;
  meshMouth.position.y = -30;
  meshMouth.position.z = 170;

  let mandy = new THREE.Group();
  mandy.add(sphereHead);
  mandy.add(hair);
  mandy.add(sphereEarR);
  mandy.add(sphereEarL);
  mandy.add(eyeR);
  mandy.add(eyeL);
  mandy.add(meshMouth);

  return mandy;
}