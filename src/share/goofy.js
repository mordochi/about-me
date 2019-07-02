import * as THREE from 'three';

export default function createGoofy(scene) {
  //head
  let geometryHead = new THREE.SphereGeometry( 200, 32, 32 );
  let materialHead = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let sphereHead = new THREE.Mesh( geometryHead, materialHead );

  //mouth
  let geometryMouthTop = new THREE.CylinderGeometry( 80, 70, 150, 32 );
  for (let i = 0; i < geometryMouthTop.vertices.length; i++) {
    let vertex = geometryMouthTop.vertices[i];
    if (vertex.z > 0) {
      vertex.z = 0;
    }
  }

  geometryMouthTop.computeFaceNormals();
  geometryMouthTop.computeVertexNormals();

  let materialMouthTop = new THREE.MeshLambertMaterial( {color: 0xffdcc1} );
  let cylinderMouthTop = new THREE.Mesh( geometryMouthTop, materialMouthTop );
  cylinderMouthTop.rotation.x = Math.PI / 2;

  let geometryMouthTopFront = new THREE.SphereGeometry( 80, 32, 32 );
  for (let i = 0; i < geometryMouthTopFront.vertices.length; i++) {
    let vertex = geometryMouthTopFront.vertices[i];
    if (vertex.z < 0) {
      vertex.z = 0;
    }

    if(vertex.y < 0) {
      vertex.y = 0;
    }
  }

  geometryMouthTopFront.computeFaceNormals();
  geometryMouthTopFront.computeVertexNormals();

  let materialMouthTopFront = new THREE.MeshLambertMaterial( {color: 0xffdcc1} );
  let sphereMouthTopFront = new THREE.Mesh( geometryMouthTopFront, materialMouthTopFront );
  sphereMouthTopFront.position.z = 75;

  let mouthTop = new THREE.Group();
  mouthTop.add(cylinderMouthTop);
  mouthTop.add(sphereMouthTopFront);

  let mouthBottom = mouthTop.clone();
  mouthBottom.applyMatrix( new THREE.Matrix4().makeScale( 0.95, 0.9, 0.9 ) );
  mouthBottom.rotation.z = Math.PI;
  mouthBottom.position.z = -20;

  let mouth = new THREE.Group();
  mouth.applyMatrix( new THREE.Matrix4().makeScale( 1.5, 1.2, 1 ) );
  mouth.add(mouthTop);
  mouth.add(mouthBottom);
  mouth.position.y = -30;
  mouth.position.z = 245;

  //eye
  let geometryEye = new THREE.CylinderGeometry( 70, 70, 50, 32 );
  geometryEye.applyMatrix( new THREE.Matrix4().makeScale( 0.6, 1, 1.2 ) );
  let materialEye = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let cylinderEye = new THREE.Mesh( geometryEye, materialEye );

  let geometryEyeBlack = new THREE.CylinderGeometry( 30, 30, 53, 32 );
  geometryEyeBlack.applyMatrix( new THREE.Matrix4().makeScale( 0.6, 1, 1.2 ) );
  let materialEyeBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderEyeBlack = new THREE.Mesh( geometryEyeBlack, materialEyeBlack );
  cylinderEyeBlack.position.x = -5;
  cylinderEyeBlack.position.z = 10;
  
  let eye = new THREE.Group();
  eye.add(cylinderEye);
  eye.add(cylinderEyeBlack);
  eye.rotation.x = Math.PI / 2;
  

  let eyeR = eye.clone();
  eyeR.rotation.x = Math.PI * 6.5 / 18;
  eyeR.position.x = 35;
  eyeR.position.y = 100;
  eyeR.position.z = 150;

  let eyeL = eye.clone();
  eyeL.rotation.x = Math.PI * 6.5 / 18;
  eyeL.rotation.z = Math.PI;
  eyeL.position.x = -35;
  eyeL.position.y = 100;
  eyeL.position.z = 150;

  //nose
  let geometryNose = new THREE.SphereGeometry( 40, 32, 32 );
  geometryNose.applyMatrix( new THREE.Matrix4().makeScale( 1.1, 0.8, 1 ) );
  let materialNose = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let sphereNose = new THREE.Mesh( geometryNose, materialNose );
  sphereNose.rotation.x = - Math.PI / 4;
  sphereNose.position.y = 60;
  sphereNose.position.z = 380;

  //teeth
  let geometryTooth = new THREE.BoxGeometry( 40, 50, 10 );
  let materialTooth = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  let cubeTooth = new THREE.Mesh( geometryTooth, materialTooth );

  let toothR = cubeTooth.clone();
  toothR.rotation.y = Math.PI / 8;
  toothR.position.x = 60;
  toothR.position.y = -30;
  toothR.position.z = 370;

  let toothL = cubeTooth.clone();
  toothL.rotation.y = - Math.PI / 8;
  toothL.position.x = -60;
  toothL.position.y = -30;
  toothL.position.z = 370;

  let teeth = new THREE.Group();
  teeth.add(toothR);
  teeth.add(toothL);

  //ear
  let extrudeSettingsEar = {
    steps: 1,
    depth: 20,
    bevelEnabled: false
  };

  let shapeEar = new THREE.Shape( );
  shapeEar.moveTo( 0, 130 );
  shapeEar.quadraticCurveTo(-55, -150, -10, -170);
  shapeEar.quadraticCurveTo(0, -175, 10, -170);
  shapeEar.quadraticCurveTo(55, -150, 0, 130);

  let geometryEar = new THREE.ExtrudeGeometry( shapeEar, extrudeSettingsEar);
  let materialEar = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let meshEar = new THREE.Mesh( geometryEar, materialEar );

  let earR = meshEar.clone();
  earR.rotation.y = - Math.PI / 8;
  earR.rotation.z = Math.PI / 5;
  earR.position.x = 240;

  let earL = meshEar.clone();
  earL.rotation.y = Math.PI / 8;
  earL.rotation.z = - Math.PI / 5;
  earL.position.x = -240;

  //hat
  let geometryHatTop = new THREE.CylinderGeometry( 90, 60, 90, 32 );
  let materialHatTop = new THREE.MeshLambertMaterial( {color: 0x82e241} );
  let cylinderHatTop = new THREE.Mesh( geometryHatTop, materialHatTop );

  let geometryHatTopCirCle = new THREE.TorusBufferGeometry( 74, 17, 16, 32 );
  let materialHatTopCircle = new THREE.MeshLambertMaterial( { color: 0x82e241 } );
  let torusHatTopCircle = new THREE.Mesh( geometryHatTopCirCle, materialHatTopCircle );
  torusHatTopCircle.rotation.x = Math.PI / 2;
  torusHatTopCircle.position.y = 50;

  let geometryHatBlack = new THREE.CylinderGeometry( 75, 63, 25, 32 );
  let materialHatBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderHatBlack = new THREE.Mesh( geometryHatBlack, materialHatBlack );
  cylinderHatBlack.position.y = -25;

  let geometryHatBottom = new THREE.CylinderGeometry( 86, 60, 70, 32 );
  let materialHatBottom = new THREE.MeshLambertMaterial( {color: 0x82e241} );
  let cylinderHatBottom = new THREE.Mesh( geometryHatBottom, materialHatBottom );
  cylinderHatBottom.position.y = -90;

  let geometryHatBottomCirCle = new THREE.TorusBufferGeometry( 70, 17, 16, 32 );
  let materialHatBottomCircle = new THREE.MeshLambertMaterial( { color: 0x82e241 } );
  let torusHatBottomCircle = new THREE.Mesh( geometryHatBottomCirCle, materialHatBottomCircle );
  torusHatBottomCircle.rotation.x = Math.PI / 2;
  torusHatBottomCircle.position.y = -50;

  let hat = new THREE.Group();
  hat.add(cylinderHatTop);
  hat.add(torusHatTopCircle);
  hat.add(cylinderHatBlack);
  hat.add(cylinderHatBottom);
  hat.add(torusHatBottomCircle);
  hat.rotation.z = Math.PI / 10;
  hat.position.x = -80;
  hat.position.y = 280;

  let goofy = new THREE.Group();
  goofy.add(sphereHead);
  goofy.add(mouth);
  goofy.add(eyeR);
  goofy.add(eyeL);
  goofy.add(sphereNose);
  goofy.add(teeth);
  goofy.add(earR);
  goofy.add(earL);
  goofy.add(hat);

  return goofy;
}