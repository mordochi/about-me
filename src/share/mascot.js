import * as THREE from 'three';
import * as SubdivisionModifier from 'three-subdivision-modifier';

export default function createMascot(scene, color, mood, arm_position) {
  //head
  let geometryHead = new THREE.SphereGeometry( 28, 32, 32 );  
  let materialHead = new THREE.MeshLambertMaterial( { color: color} );
  let head = new THREE.Mesh( geometryHead, materialHead );

  //mouth
  let geometryMouth = new THREE.CylinderGeometry( 10, 20, 40, 8, 3 );
  geometryMouth.mergeVertices();
  let modifier = new SubdivisionModifier(2);
  modifier.modify(geometryMouth);
  geometryMouth.faceVertexUvs[0].length = 0;

  let materialMouth = new THREE.MeshLambertMaterial( {color: color} );
  let cylinderMouth = new THREE.Mesh( geometryMouth, materialMouth );
  cylinderMouth.rotation.x = Math.PI / 2.3;
  cylinderMouth.position.z = 17;
  cylinderMouth.position.y = -5;

  //nose
  let geometryNose = new THREE.CylinderGeometry( 5, 7, 3, 3, 3 );
  geometryNose.applyMatrix( new THREE.Matrix4().makeScale( 1.5, 1.0, 1.0 ) );
  let modifierNose = new SubdivisionModifier(2);
  geometryNose.mergeVertices();
  modifierNose.modify(geometryNose);
  geometryNose.faceVertexUvs[0].length = 0;

  let materialNose = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderNose = new THREE.Mesh( geometryNose, materialNose );
  cylinderNose.rotation.x = Math.PI / 2.4;
  cylinderNose.position.z = 35;
  cylinderNose.position.y = 2;

  //ear
  let geometryEar = new THREE.SphereGeometry( 5, 10, 6 );
  geometryEar.applyMatrix( new THREE.Matrix4().makeScale( 2.5, 6, 1.0 ) );
  for (let i = 0; i < geometryEar.vertices.length; i++) {
    let vertex = geometryEar.vertices[i];
    if (vertex.y < 0) {
      vertex.y = 0;
    } 
    if (vertex.z > 1.5) {
      vertex.z = 1.5;
    }
  }

  geometryEar.computeFaceNormals();
  geometryEar.computeVertexNormals();

  let modifierEar = new SubdivisionModifier(2);
  geometryEar.mergeVertices();
  modifierEar.modify(geometryEar);
  geometryEar.faceVertexUvs[0].length = 0;
  
  let materialEar = new THREE.MeshLambertMaterial( {color: color} );
  let cylinderEar = new THREE.Mesh( geometryEar, materialEar );

  let cylinderEarR = cylinderEar.clone();
  cylinderEarR.rotation.z = - Math.PI / 9;
  cylinderEarR.position.x = 10;
  cylinderEarR.position.y = 10;
  cylinderEarR.position.z = 3;

  let cylinderEarL = cylinderEar.clone();
  cylinderEarL.rotation.z = Math.PI / 9;
  cylinderEarL.position.x = - 10;
  cylinderEarL.position.y = 10;
  cylinderEarL.position.z = 3;

  //eye
  let geometryEye = new THREE.CylinderGeometry( 7, 8, 5, 10, 3 );
  let modifierEye = new SubdivisionModifier(2);
  geometryEye.mergeVertices();
  modifierEye.modify(geometryEye);
  geometryEye.faceVertexUvs[0].length = 0;

  let materialEye = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let cylinderEye = new THREE.Mesh( geometryEye, materialEye );
  cylinderEye.rotation.x = Math.PI / 2;

  let geometryEyeBlack = new THREE.CylinderGeometry( 5, 6, 1, 10, 3 );
  let modifierEyeBlack = new SubdivisionModifier(2);
  geometryEyeBlack.mergeVertices();
  modifierEyeBlack.modify(geometryEyeBlack);
  geometryEyeBlack.faceVertexUvs[0].length = 0;

  let materialEyeBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let cylinderEyeBlack = new THREE.Mesh( geometryEyeBlack, materialEyeBlack );
  cylinderEyeBlack.rotation.x = Math.PI / 2;
  cylinderEyeBlack.position.z = 2.4;

  let geometryEyeShine = new THREE.CylinderGeometry( 2, 3, 1, 10, 3 );
  let modifierEyeShine = new SubdivisionModifier(2);
  geometryEyeShine.mergeVertices();
  modifierEyeShine.modify(geometryEyeShine);
  geometryEyeShine.faceVertexUvs[0].length = 0;

  let materialEyeShine = new THREE.MeshLambertMaterial( {color: 0xffe8d1} );
  let cylinderEyeShine = new THREE.Mesh( geometryEyeShine, materialEyeShine );
  cylinderEyeShine.rotation.x = Math.PI / 2;
  cylinderEyeShine.position.x = 2.7;
  cylinderEyeShine.position.y = 3;
  cylinderEyeShine.position.z = 2.4;

  let eyeGroup = new THREE.Group();
  eyeGroup.add(cylinderEye);
  eyeGroup.add(cylinderEyeBlack);
  eyeGroup.add(cylinderEyeShine);

  let rightEye = eyeGroup.clone();
  rightEye.rotation.x = - Math.PI / 7;
  rightEye.rotation.y = Math.PI / 9;
  rightEye.position.x = 10;
  rightEye.position.y = 11;
  rightEye.position.z = 21;
  let leftEye = eyeGroup.clone();
  leftEye.rotation.x = - Math.PI / 7;
  leftEye.rotation.y = - Math.PI / 9;
  leftEye.position.x = -10;
  leftEye.position.y = 11;
  leftEye.position.z = 21;

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
  geometryEyebrow.applyMatrix( new THREE.Matrix4().makeScale( 0.25, 0.25, 0.25 ) );
  let materialEyebrow = new THREE.MeshLambertMaterial( {color: 0x000000} );
  let meshEyebrow = new THREE.Mesh( geometryEyebrow, materialEyebrow );
  
  let meshEyebrowR = meshEyebrow.clone();
  meshEyebrowR.rotation.y = Math.PI / 8;
  meshEyebrowR.rotation.z = - Math.PI / 10;
  meshEyebrowR.position.x = 11;
  meshEyebrowR.position.y = 18;
  meshEyebrowR.position.z = 17;

  let meshEyebrowL = meshEyebrow.clone();
  meshEyebrowL.rotation.y = Math.PI * 6.9 / 8;
  meshEyebrowL.rotation.z = - Math.PI / 10;
  meshEyebrowL.position.x = -11;
  meshEyebrowL.position.y = 18;
  meshEyebrowL.position.z = 17;

  if(mood === 'angry') {
    meshEyebrowR.rotation.y = Math.PI * 2 / 8;
    meshEyebrowR.rotation.z = Math.PI / 20;
    meshEyebrowR.position.x = 9;
    meshEyebrowR.position.y = 20;
    meshEyebrowL.rotation.y = Math.PI * 5.8 / 8;
    meshEyebrowL.rotation.z = Math.PI / 20;
    meshEyebrowL.position.x = -9;
    meshEyebrowL.position.y = 20;
  }

  //teeth
  let extrudeSettingsTeeth = {
    steps: 4,
    depth: 4,
    bevelEnabled: false,
  };

  let shapeTeeth = new THREE.Shape( );
  shapeTeeth.moveTo( -4, 1 );
  shapeTeeth.lineTo(5, 3);
  shapeTeeth.bezierCurveTo(3, -3, -3, -4, -4, 1);

  let geometryTeeth = new THREE.ExtrudeGeometry( shapeTeeth, extrudeSettingsTeeth );
  geometryTeeth.applyMatrix( new THREE.Matrix4().makeScale( 0.75, 0.75, 0.75 ) );
  let materialTeeth = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let meshTeeth = new THREE.Mesh( geometryTeeth, materialTeeth );
  meshTeeth.rotation.x = - Math.PI / 20;
  meshTeeth.position.x = 1;
  meshTeeth.position.y = -4;
  meshTeeth.position.z = 34.2;

  //body
  let geometryBody = new THREE.CylinderGeometry( 7, 17, 80, 8, 3 );
  geometryBody.applyMatrix( new THREE.Matrix4().makeScale( 1.25, 1, 1 ) );
  let modifierBody = new SubdivisionModifier(2);
  geometryBody.mergeVertices();
  modifierBody.modify(geometryBody);
  geometryBody.faceVertexUvs[0].length = 0;

  let materialBody = new THREE.MeshLambertMaterial( {color: color} );
  let cylinderBody = new THREE.Mesh( geometryBody, materialBody );
  cylinderBody.position.y = -30;

  //arm
  let geometryArm = new THREE.CylinderGeometry( 2, 3, 35, 8, 3 );
  let modifierArm = new SubdivisionModifier(2);
  geometryArm.mergeVertices();
  modifierArm.modify(geometryArm);
  geometryArm.faceVertexUvs[0].length = 0;

  let materialArm = new THREE.MeshLambertMaterial( {color: color} );
  let cylinderArm = new THREE.Mesh( geometryArm, materialArm );

  let cylinderArmR = cylinderArm.clone();
  cylinderArmR.rotation.z = Math.PI / 10;
  cylinderArmR.position.x = 19;
  cylinderArmR.position.y = - 43;

  let cylinderArmL = cylinderArm.clone();
  cylinderArmL.rotation.z = - Math.PI / 10;
  cylinderArmL.position.x = -19;
  cylinderArmL.position.y = -43;

  if(arm_position === 'hold') {
    let extrudeSettingsArm = {
      steps: 1,
      depth: 1,
      bevelThickness: 3,
    };

    let shapeArm = new THREE.Shape( );
    shapeArm.moveTo( 0, 20 );
    shapeArm.quadraticCurveTo(9, 8, 0, 1);
    shapeArm.quadraticCurveTo(-5, 0, -1, 2);
    shapeArm.quadraticCurveTo(7, 8, 0, 19);

    let geometryArm = new THREE.ExtrudeGeometry( shapeArm, extrudeSettingsArm);
    geometryArm.applyMatrix( new THREE.Matrix4().makeScale( 1.5, 1.5, 0.6 ) );
    let materialArm = new THREE.MeshLambertMaterial( {color: color} );
    let meshArm = new THREE.Mesh( geometryArm, materialArm );
    
    cylinderArmR = meshArm.clone();
    cylinderArmR.rotation.z = Math.PI / 6;
    cylinderArmR.rotation.x = - Math.PI / 2;
    cylinderArmR.position.x = 25;
    cylinderArmR.position.y = -30;
    cylinderArmR.position.z = 25;

    cylinderArmL = meshArm.clone();
    cylinderArmL.rotation.y = Math.PI;
    cylinderArmL.rotation.z = Math.PI / 6;
    cylinderArmL.rotation.x = - Math.PI / 2;
    cylinderArmL.position.x = -25;
    cylinderArmL.position.y = -30;
    cylinderArmL.position.z = 25;
  }

  //leg
  let geometryLeg = geometryArm.clone();
  geometryLeg.applyMatrix( new THREE.Matrix4().makeScale( 1.4, 1.3, 1.4 ) );

  let materialLeg = new THREE.MeshLambertMaterial( {color: color} );
  let cylinderLeg = new THREE.Mesh( geometryLeg, materialLeg );

  let cylinderLegR = cylinderLeg.clone();
  cylinderLegR.position.x = 10;
  cylinderLegR.position.y = -80;

  let cylinderLegL = cylinderLeg.clone();
  cylinderLegL.position.x = -10;
  cylinderLegL.position.y = -80;

  //tail
  let extrudeSettingsTail = {
    steps: 1,
    depth: 1,
  };

  let shapeTail = new THREE.Shape( );
  shapeTail.moveTo( -10, 0 );
  shapeTail.bezierCurveTo(4, 0, 17, 5, 17, 10);
  shapeTail.bezierCurveTo(22, 20, 5, 25, 10, 40);
  shapeTail.bezierCurveTo(14, 47, 12, 50, 9, 55);
  shapeTail.bezierCurveTo(8, 58, 6, 55, 9, 50);
  shapeTail.bezierCurveTo(12, 45, 7, 40, 7, 30);
  shapeTail.bezierCurveTo(8, 25, 20, 17, 12, 7);
  shapeTail.bezierCurveTo(14, 5, 3, 2, -10, 1);

  let geometryTail = new THREE.ExtrudeGeometry( shapeTail, extrudeSettingsTail);
  geometryTail.applyMatrix( new THREE.Matrix4().makeScale( 0.4, 0.5, 0.4 ) );
  let materialTail = new THREE.MeshLambertMaterial( {color: color} );
  let meshTail = new THREE.Mesh( geometryTail, materialTail );
  meshTail.rotation.y = Math.PI / 2;
  meshTail.position.y = -60;
  meshTail.position.z = -15;

  //light
  let light = new THREE.PointLight( 0xffffff, 0.6, 300 );
  light.position.set( 30, 50, 100 );
  //let pointLightHelper = new THREE.PointLightHelper( light, 300 );


  let groupHead = new THREE.Group();
  groupHead.add(head);
  groupHead.add(cylinderMouth);
  groupHead.add(cylinderNose);
  groupHead.add(cylinderEarR);
  groupHead.add(cylinderEarL);
  groupHead.add(rightEye);
  groupHead.add(leftEye);
  groupHead.add(meshEyebrowR);
  groupHead.add(meshEyebrowL);
  if(mood !== 'angry') groupHead.add(meshTeeth);

  let groupBody = new THREE.Group();
  groupBody.add(cylinderBody);
  groupBody.add(cylinderArmR);
  groupBody.add(cylinderArmL);
  groupBody.add(cylinderLegR);
  groupBody.add(cylinderLegL);
  groupBody.add(meshTail);

  let mascot = new THREE.Group();
  mascot.add(groupHead);
  mascot.add(groupBody);
  mascot.add(light);
  //mascot.add(pointLightHelper);

  return mascot;
}