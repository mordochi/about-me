import * as THREE from 'three';

export default function createDonaldDuck(scene) {
  //head
  let geometryHead = new THREE.SphereGeometry( 200, 32, 32 );
  let materialHead = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let sphereHead = new THREE.Mesh( geometryHead, materialHead );

  //mouth
  var curveMouthTop = new THREE.CubicBezierCurve3(
    new THREE.Vector3( 0, 0, 1.4 ),
    new THREE.Vector3( 0, -1, 1 ),
    new THREE.Vector3( 0, -3, 0.5 ),
    new THREE.Vector3( 0, -5, 0 )
  );

  let extrudeSettingsMouthTop = {
    steps: 10,
    bevelEnabled: false,
    extrudePath: curveMouthTop
  };

  let shapeMouth = new THREE.Shape( );
  shapeMouth.moveTo( 140, 0 );
  shapeMouth.quadraticCurveTo(140, 190, 0, 190);
  shapeMouth.quadraticCurveTo(-140, 190, -140, 0);

  let geometryMouthTop = new THREE.ExtrudeGeometry( shapeMouth, extrudeSettingsMouthTop );
  let materialMouthTop = new THREE.MeshLambertMaterial( { color: 0xffdd38} );
  let mouthTop = new THREE.Mesh( geometryMouthTop, materialMouthTop );
  mouthTop.rotation.x = Math.PI / 1.14;

  let geometryMouthInner = new THREE.ConeGeometry( 46, 30, 32 );
  for (var i = 0; i < geometryMouthInner.vertices.length; i++) {
    var vertex = geometryMouthInner.vertices[i];
    if (vertex.y >= 0) {
      vertex.z += 35;
    }
  }

  geometryMouthInner.computeFaceNormals();
  geometryMouthInner.computeVertexNormals();

  geometryMouthInner.applyMatrix( new THREE.Matrix4().makeScale( 3, 2, 1.4 ) );
  let materialMouthInner = new THREE.MeshLambertMaterial( {color: 0xffdd38} );
  let coneMouthInner = new THREE.Mesh( geometryMouthInner, materialMouthInner );
  coneMouthInner.position.y = 35;
  coneMouthInner.position.z = 20;

  let extrudeSettingsMouthBottom = {
    steps: 1,
    depth: 15,
    bevelEnabled: false,
  };

  let geometryMouthBottom = new THREE.ExtrudeGeometry( shapeMouth, extrudeSettingsMouthBottom );
  geometryMouthBottom.applyMatrix( new THREE.Matrix4().makeScale( 0.9, 0.97, 0.9 ) );
  let materialMouthBottom = new THREE.MeshLambertMaterial( { color: 0xffdd38} );
  let mouthBottom = new THREE.Mesh( geometryMouthBottom, materialMouthBottom );
  mouthBottom.rotation.x = Math.PI / 2;
  mouthBottom.position.z = -5;

  let mouth = new THREE.Group();
  mouth.add(mouthTop);
  mouth.add(coneMouthInner);
  mouth.add(mouthBottom);
  mouth.position.y = -40;
  mouth.position.z = 130;

  //eye
  let geometryEye = new THREE.CylinderGeometry( 70, 70, 50, 32 );
  geometryEye.applyMatrix( new THREE.Matrix4().makeScale( 0.6, 1, 1.2 ) );
  let materialEye = new THREE.MeshLambertMaterial( {color: 0xa5e4ff} );
  let cylinderEye = new THREE.Mesh( geometryEye, materialEye );

  let geometryEyeBlack = new THREE.CylinderGeometry( 30, 30, 53, 32 );
  geometryEyeBlack.applyMatrix( new THREE.Matrix4().makeScale( 0.6, 1, 1.2 ) );
  let materialEyeBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderEyeBlack = new THREE.Mesh( geometryEyeBlack, materialEyeBlack );
  cylinderEyeBlack.position.x = -8;
  cylinderEyeBlack.position.z = 20;
  
  let eye = new THREE.Group();
  eye.add(cylinderEye);
  eye.add(cylinderEyeBlack);
  eye.rotation.x = Math.PI / 2;
  
  let eyeR = eye.clone();
  eyeR.rotation.x = Math.PI * 8.5 / 18;
  eyeR.rotation.z = - Math.PI / 10;
  eyeR.position.x = 50;
  eyeR.position.y = 60;
  eyeR.position.z = 165;

  let eyeL = eye.clone();
  eyeL.rotation.x = Math.PI * 8.5 / 18;
  eyeL.rotation.z = Math.PI * 11 / 10;
  eyeL.position.x = -50;
  eyeL.position.y = 60;
  eyeL.position.z = 165;

  //hat
  let geometryHatBottom = new THREE.CylinderGeometry( 130, 60, 40, 32 );
  let materialHatBottom = new THREE.MeshLambertMaterial( {color: 0x0790f9} );
  let cylinderHatBottom = new THREE.Mesh( geometryHatBottom, materialHatBottom );

  let geometryHatTopCirCle = new THREE.TorusBufferGeometry( 114, 17, 16, 32 );
  let materialHatTopCircle = new THREE.MeshLambertMaterial( { color: 0x0790f9 } );
  let torusHatTopCircle = new THREE.Mesh( geometryHatTopCirCle, materialHatTopCircle );
  torusHatTopCircle.rotation.x = Math.PI / 2;
  torusHatTopCircle.position.y = 26;

  let geometryHatTop = new THREE.CylinderGeometry( 115, 60, 20, 32 );
  let materialHatTop = new THREE.MeshLambertMaterial( {color: 0x0790f9} );
  let cylinderHatTop = new THREE.Mesh( geometryHatTop, materialHatTop );
  cylinderHatTop.position.y = 33;

  let geometryHatBlack = new THREE.CylinderGeometry( 75, 75, 30, 32 );
  let materialHatBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderHatBlack = new THREE.Mesh( geometryHatBlack, materialHatBlack );
  cylinderHatBlack.position.y = -25;

  let extrudeSettingsHatTag = {
    steps: 1,
    depth: 3,
    bevelEnabled: false,
  };

  let shapeHatTag = new THREE.Shape();
  shapeHatTag.moveTo( -15, 40 );
  shapeHatTag.lineTo( -15, -40 );
  shapeHatTag.lineTo(0, -20);
  shapeHatTag.lineTo(15, -40);
  shapeHatTag.lineTo(15, 40);

  let geometryHatTag = new THREE.ExtrudeGeometry( shapeHatTag, extrudeSettingsHatTag );
  let materialHatTag = new THREE.MeshLambertMaterial( { color: 0x000000} );
  let tag = new THREE.Mesh( geometryHatTag, materialHatTag );
  tag.rotation.x = Math.PI / 2.5;
  tag.rotation.z = Math.PI / 4;
  tag.position.x = 140;
  tag.position.y = 20;
  tag.position.z = -60;

  let hat = new THREE.Group();
  hat.add(cylinderHatBottom);
  hat.add(torusHatTopCircle);
  hat.add(cylinderHatTop);
  hat.add(cylinderHatBlack);
  hat.add(tag);
  hat.rotation.z = Math.PI / 12;
  hat.position.x = -60;
  hat.position.y = 210;

  let donaldDuck = new THREE.Group();
  donaldDuck.add(sphereHead);
  donaldDuck.add(mouth);
  donaldDuck.add(eyeR);
  donaldDuck.add(eyeL);
  donaldDuck.add(hat);

  return donaldDuck;
}