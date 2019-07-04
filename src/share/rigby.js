import * as THREE from 'three';

export default function createRigby(scene) {
  //head
  let geometryHead = new THREE.SphereGeometry( 200, 32, 32 );
  let materialHead = new THREE.MeshLambertMaterial( {color: 0xc6b79f} );
  let sphereHead = new THREE.Mesh( geometryHead, materialHead );

  //brown
  let geometryBrown = new THREE.SphereGeometry( 202, 120, 120 );
  for (var i = 0; i < geometryBrown.vertices.length; i++) {
    var vertex = geometryBrown.vertices[i];
    if (vertex.z >= 160) {
      vertex.z = 160;
    }
  }

  geometryBrown.computeFaceNormals();
  geometryBrown.computeVertexNormals();
  
  
  let materialBrown = new THREE.MeshLambertMaterial( {color: 0xb58a44} );
  let sphereBrown = new THREE.Mesh( geometryBrown, materialBrown );
  sphereBrown.rotation.x = Math.PI / 5;

  let head = new THREE.Group();
  head.add(sphereHead);
  head.add(sphereBrown);
  head.scale.x = 0.9
  head.scale.y = 1;
  head.scale.z = 0.9;

  //eye
  let geometryEye = new THREE.CylinderGeometry( 40, 40, 30, 32, 32 );
  let materialEye = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let cylinderEye = new THREE.Mesh( geometryEye, materialEye );
  cylinderEye.rotation.x = Math.PI / 2;

  let geometryEyelid = new THREE.CylinderGeometry( 50, 50, 25, 32, 32 );
  let materialEyelid = new THREE.MeshLambertMaterial( {color: 0x663e00} );
  let cylinderEyelid = new THREE.Mesh( geometryEyelid, materialEyelid );
  cylinderEyelid.rotation.x = Math.PI / 2;

  let geometryEyeBlack = new THREE.CylinderGeometry( 10, 10, 31, 32, 32 );
  let materialEyeBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderEyeBlack = new THREE.Mesh( geometryEyeBlack, materialEyeBlack );
  cylinderEyeBlack.rotation.x = Math.PI / 2;
  cylinderEyeBlack.position.z = 2.4;

  let eye = new THREE.Group();
  eye.add(cylinderEye);
  eye.add(cylinderEyelid);
  eye.add(cylinderEyeBlack);

  let eyeR = eye.clone();
  eyeR.rotation.x = - Math.PI / 9;
  eyeR.rotation.y = Math.PI / 12;
  eyeR.position.x = 40;
  eyeR.position.y = 70;
  eyeR.position.z = 150;

  let eyeL = eye.clone();
  eyeL.rotation.x = - Math.PI / 9;
  eyeL.rotation.y = - Math.PI / 12;
  eyeL.position.x = -40;
  eyeL.position.y = 70;
  eyeL.position.z = 150;

  //mouth
  let geometryMouth = new THREE.CylinderGeometry( 15, 125, 215, 32 );
  for (let i = 0; i < geometryMouth.vertices.length; i++) {
    let vertex = geometryMouth.vertices[i];
    if (vertex.y >= 0) {
      vertex.z -= 50;
    }
  }

  geometryMouth.computeFaceNormals();
  geometryMouth.computeVertexNormals();

  let materialMouth = new THREE.MeshLambertMaterial( {color: 0xc6b79f} );
  let cylinderMouth = new THREE.Mesh( geometryMouth, materialMouth );

  //mouth brown
  let geometryMouthBrown = new THREE.CylinderGeometry( 17, 127, 216, 32 );
  for (let i = 0; i < geometryMouthBrown.vertices.length; i++) {
    let vertex = geometryMouthBrown.vertices[i];
    if(vertex.z > 0) {
      vertex.z = 0;
    }

    if (vertex.y >= 0) {
      vertex.z -= 50;
    }    
  }

  geometryMouthBrown.computeFaceNormals();
  geometryMouthBrown.computeVertexNormals();

  let materialMouthBrown = new THREE.MeshLambertMaterial( {color: 0xb58a44} );
  let cylinderMouthBrown = new THREE.Mesh( geometryMouthBrown, materialMouthBrown );

  let mouth = new THREE.Group();
  mouth.add(cylinderMouth);
  mouth.add(cylinderMouthBrown)
  mouth.rotation.x = Math.PI * 1 / 2;
  mouth.position.y = -55;
  mouth.position.z = 185;

  //nose
  let geometryNose = new THREE.SphereGeometry( 15, 16, 16 );
  geometryNose.applyMatrix( new THREE.Matrix4().makeScale( 1, 1.5, 1 ) );
  let materialNose = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let sphereNose = new THREE.Mesh( geometryNose, materialNose );
  sphereNose.rotation.x = Math.PI / 8;
  sphereNose.position.y = 20;
  sphereNose.position.z = 300;

  //ear
  let geometryEar = new THREE.SphereGeometry( 30, 16, 16 );
  for (let i = 0; i < geometryEar.vertices.length; i++) {
    let vertex = geometryEar.vertices[i];
    if(vertex.z > 20) {
      vertex.z = 20;
    }  
  }

  geometryEar.computeFaceNormals();
  geometryEar.computeVertexNormals();

  geometryEar.applyMatrix( new THREE.Matrix4().makeScale( 1, 1.5, 0.7 ) );
  let materialEar = new THREE.MeshLambertMaterial( {color: 0xb58a44} );
  let sphereEar = new THREE.Mesh( geometryEar, materialEar );

  let earR = sphereEar.clone();
  earR.rotation.z = - Math.PI / 7;
  earR.position.x = 140;
  earR.position.y = 175;

  let earL = sphereEar.clone();
  earL.rotation.z = Math.PI / 7;
  earL.position.x = -140;
  earL.position.y = 175;

  //hair
  let extrudeSettingsHair = {
    steps: 1,
    depth: 20,
    bevelEnabled: false
  };

  let shapeHair = new THREE.Shape( );
  shapeHair.moveTo( -100, -15 );
  shapeHair.lineTo(100, -15);
  shapeHair.quadraticCurveTo(130, 50, 100, 60);
  shapeHair.quadraticCurveTo(80, 60, 70, 25);
  shapeHair.quadraticCurveTo(60, 60, 40, 70);
  shapeHair.quadraticCurveTo(0, 80, 15, 20);
  shapeHair.quadraticCurveTo(5, 55, -5, 55);
  shapeHair.quadraticCurveTo(-25, 55, -40, 20);
  shapeHair.quadraticCurveTo(-50, 70, -70, 60);
  shapeHair.quadraticCurveTo(-80, 60, -100, -15);

  let geometryHair = new THREE.ExtrudeGeometry( shapeHair, extrudeSettingsHair );
  let materialHair = new THREE.MeshLambertMaterial( {color: 0xb58a44} );
  let meshHair = new THREE.Mesh( geometryHair, materialHair );
  meshHair.rotation.x = Math.PI / 4;
  meshHair.position.x = -5;
  meshHair.position.y = 180;

  let rigby = new THREE.Group();
  rigby.add(head);
  rigby.add(eyeR);
  rigby.add(eyeL);
  rigby.add(mouth);
  rigby.add(sphereNose);
  rigby.add(earR);
  rigby.add(earL);
  rigby.add(meshHair);

  return rigby;
}