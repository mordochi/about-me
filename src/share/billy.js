import * as THREE from 'three';

export default function createBilly(scene) {
  //head
  let geometryHead = new THREE.SphereGeometry( 200, 16, 16 );
  geometryHead.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.05, 0.9 ) );
  let materialHead = new THREE.MeshLambertMaterial( {color: 0xffcfaa} );
  let sphereHead = new THREE.Mesh( geometryHead, materialHead );

  //hat
  let geometryHat = new THREE.SphereGeometry( 205, 16, 16 );
  for (var i = 0; i < geometryHat.vertices.length; i++) {
    var vertex = geometryHat.vertices[i];
    if (vertex.y <= 170) {
      vertex.x = 0;
      vertex.y = 170;
      vertex.z = 0;
    }
  }

  geometryHat.computeFaceNormals();
  geometryHat.computeVertexNormals();

  geometryHat.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.15, 0.9 ) );
  let materialHat = new THREE.MeshLambertMaterial( {color: 0xdb2b00} );
  let sphereHat = new THREE.Mesh( geometryHat, materialHat );

  let extrudeSettingsBrim = {
    steps: 1,
    depth: 3,
    bevelEnabled: false
  };

  let shapeBrim = new THREE.Shape( );
  shapeBrim.moveTo( 110, 0 );
  shapeBrim.quadraticCurveTo(110, 200, 0, 200);
  shapeBrim.quadraticCurveTo(-110, 200, -110, 0);

  let geometryBrim = new THREE.ExtrudeGeometry( shapeBrim, extrudeSettingsBrim );
  let materialBrim = new THREE.MeshLambertMaterial( { color: 0xdb2b00} );
  let brim = new THREE.Mesh( geometryBrim, materialBrim );
  brim.rotation.x = Math.PI / 2;
  brim.position.y = 200;

  let hat = new THREE.Group();
  hat.add(sphereHat);
  hat.add(brim);
  hat.position.y = -20;

  //nose
  let geometryNose = new THREE.SphereGeometry( 75, 16, 16 );
  geometryNose.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.2, 1.0 ) );
  let materialNose = new THREE.MeshLambertMaterial( {color: 0xffb5a3} );
  let sphereNose = new THREE.Mesh( geometryNose, materialNose );
  sphereNose.rotation.x = Math.PI / 3;
  sphereNose.position.y = 15;
  sphereNose.position.z = 230;

  //eye
  let geometryEye = new THREE.SphereGeometry( 20, 16, 16 );
  geometryEye.applyMatrix( new THREE.Matrix4().makeScale( 0.5, 1.3, 0.2 ) );
  let materialEye = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let sphereEye = new THREE.Mesh( geometryEye, materialEye );

  let sphereEyeR = sphereEye.clone();
  sphereEyeR.rotation.x = - Math.PI / 8;
  sphereEyeR.position.x = 40;
  sphereEyeR.position.y = 100;
  sphereEyeR.position.z = 150;

  let sphereEyeL = sphereEye.clone();
  sphereEyeL.rotation.x = - Math.PI / 8;
  sphereEyeL.position.x = -40;
  sphereEyeL.position.y = 100;
  sphereEyeL.position.z = 150;

  //eyebrow
  let extrudeSettings = {
    steps: 1,
    depth: 1,
  };

  let shape = new THREE.Shape( );
  shape.moveTo( -15, 0 );
  shape.bezierCurveTo(-5, 3, 0, 3, 15, 2);
  shape.quadraticCurveTo(17, 1, 15, 1);
  shape.bezierCurveTo(-2, 2, -7, 2, -14, -1);
  shape.quadraticCurveTo(-17, -0.5, -15, 0);

  let geometryEyebrow = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  geometryEyebrow.applyMatrix( new THREE.Matrix4().makeScale( 1.1, 1, 1 ) );
  let materialEyebrow = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let meshEyebrow = new THREE.Mesh( geometryEyebrow, materialEyebrow );
  
  let meshEyebrowR = meshEyebrow.clone();
  meshEyebrowR.rotation.y = Math.PI / 24;
  meshEyebrowR.rotation.z = - Math.PI / 14;
  meshEyebrowR.position.x = 45;
  meshEyebrowR.position.y = 145;
  meshEyebrowR.position.z = 120;

  let meshEyebrowL = meshEyebrow.clone();
  meshEyebrowL.rotation.y = Math.PI * 23 / 24;
  meshEyebrowL.rotation.z = - Math.PI / 14;
  meshEyebrowL.position.x = -45;
  meshEyebrowL.position.y = 145;
  meshEyebrowL.position.z = 120;

  //mouth
  let extrudeSettingsMouth = {
    steps: 1,
    depth: 30,
    bevelEnabled: false
  };

  let shapeMouth = new THREE.Shape( );
  shapeMouth.moveTo( 0, 40 );
  shapeMouth.quadraticCurveTo(-4, 16, -30, 0);
  shapeMouth.quadraticCurveTo(140, -30, 140, 120);
  shapeMouth.quadraticCurveTo(144, 120, 150, 114);
  shapeMouth.quadraticCurveTo(148, 125, 133, 130);
  shapeMouth.quadraticCurveTo(130, -20, -12, 4);
  shapeMouth.quadraticCurveTo(0, 16, 6, 40);

  let geometryMouth = new THREE.ExtrudeGeometry( shapeMouth, extrudeSettingsMouth );
  let materialMouth = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let meshMouth = new THREE.Mesh( geometryMouth, materialMouth );
  meshMouth.rotation.y = Math.PI / 23;
  meshMouth.rotation.x = Math.PI / 38;
  meshMouth.position.x = -20;
  meshMouth.position.y = -100;
  meshMouth.position.z = 140;

  //ear
  let geometryEar = new THREE.SphereGeometry( 50, 16, 16 );
  geometryEar.applyMatrix( new THREE.Matrix4().makeScale( 0.8, 1.15, 0.5 ) );
  let materialEar = new THREE.MeshLambertMaterial( {color: 0xffcfaa} );
  let sphereEar = new THREE.Mesh( geometryEar, materialEar );

  let sphereEarR = sphereEar.clone();
  sphereEarR.rotation.z = - Math.PI / 18;
  sphereEarR.position.x = 205;
  sphereEarR.position.y = 20;

  let sphereEarL = sphereEar.clone();
  sphereEarL.rotation.z = Math.PI / 18;
  sphereEarL.position.x = -205;
  sphereEarL.position.y = 20;


  let billy = new THREE.Group();
  billy.add(sphereHead);
  billy.add(hat);
  billy.add(sphereNose);
  billy.add(sphereEyeR);
  billy.add(sphereEyeL);
  billy.add(meshEyebrowR);
  billy.add(meshEyebrowL);
  billy.add(meshMouth);
  billy.add(sphereEarR);
  billy.add(sphereEarL);

  return billy;
}