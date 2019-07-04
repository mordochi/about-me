import * as THREE from 'three';

export default function createStage(scene) {
  //platform
  let geometryPlatform = new THREE.CylinderGeometry( 400, 400, 100, 32 );
  let materialPlatform = new THREE.MeshLambertMaterial( {color: 0x80cecb} );
  let cylinderPlatform = new THREE.Mesh( geometryPlatform, materialPlatform );


  //pillar
  let geometryPillar = new THREE.CylinderGeometry( 10, 10, 250, 32 );
  let materialPillar = new THREE.MeshLambertMaterial( {color: 0xb8dddc} );
  let cylinderPillar = new THREE.Mesh( geometryPillar, materialPillar );

  let pillar1 = cylinderPillar.clone();
  pillar1.position.x = 450;
  pillar1.position.y = 50;
  pillar1.position.z = 0;

  let pillar2 = cylinderPillar.clone();
  pillar2.position.x = 450 * Math.cos(Math.PI / 6);
  pillar2.position.y = 50;
  pillar2.position.z = 450 * Math.sin(Math.PI / 6);

  let pillar3 = cylinderPillar.clone();
  pillar3.position.x = 450 * Math.cos(Math.PI / 3);
  pillar3.position.y = 50;
  pillar3.position.z = 450 * Math.sin(Math.PI / 3);

  let pillar4 = cylinderPillar.clone();
  pillar4.position.x = 450 * Math.cos(Math.PI / 2);
  pillar4.position.y = 50;
  pillar4.position.z = 450 * Math.sin(Math.PI / 2);

  let pillar5 = cylinderPillar.clone();
  pillar5.position.x = 450 * Math.cos(Math.PI * 2 / 3);
  pillar5.position.y = 50;
  pillar5.position.z = 450 * Math.sin(Math.PI * 2 / 3);

  let pillar6 = cylinderPillar.clone();
  pillar6.position.x = 450 * Math.cos(Math.PI * 5 / 6);
  pillar6.position.y = 50;
  pillar6.position.z = 450 * Math.sin(Math.PI * 5 / 6);

  let pillar7 = cylinderPillar.clone();
  pillar7.position.x = - 450;
  pillar7.position.y = 50;
  pillar7.position.z = 0;

  let pillar8 = cylinderPillar.clone();
  pillar8.position.x = 450 * Math.cos(Math.PI * 5 / 6);
  pillar8.position.y = 50;
  pillar8.position.z = - 450 * Math.sin(Math.PI * 5 / 6);
  
  let pillar9 = cylinderPillar.clone();
  pillar9.position.x = 450 * Math.cos(Math.PI * 2 / 3);
  pillar9.position.y = 50;
  pillar9.position.z = - 450 * Math.sin(Math.PI * 2 / 3);

  let pillar10 = cylinderPillar.clone();
  pillar10.position.x = 450 * Math.cos(Math.PI / 2);
  pillar10.position.y = 50;
  pillar10.position.z = - 450 * Math.sin(Math.PI / 2);
  
  let pillar11 = cylinderPillar.clone();
  pillar11.position.x = 450 * Math.cos(Math.PI / 3);
  pillar11.position.y = 50;
  pillar11.position.z = - 450 * Math.sin(Math.PI / 3);

  let pillar12 = cylinderPillar.clone();
  pillar12.position.x = 450 * Math.cos(Math.PI / 6);
  pillar12.position.y = 50;
  pillar12.position.z = - 450 * Math.sin(Math.PI / 6);

  let pillars = new THREE.Group();
  pillars.add(pillar1);
  pillars.add(pillar2);
  pillars.add(pillar3);
  pillars.add(pillar4);
  pillars.add(pillar5);
  pillars.add(pillar6);
  pillars.add(pillar7);
  pillars.add(pillar8);
  pillars.add(pillar9);
  pillars.add(pillar10);
  pillars.add(pillar11);
  pillars.add(pillar12);

  //rope
  let path = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3( -115, 0, 0 ),
    new THREE.Vector3( 0, -70, 0 ),
    new THREE.Vector3( 115, 0, 0 )
  );
  let geometryRope = new THREE.TubeGeometry( path, 20, 8, 8, false );
  let materialRope = new THREE.MeshBasicMaterial( { color: 0xad0a0a } );
  let meshRope = new THREE.Mesh( geometryRope, materialRope );

  let rope1 = meshRope.clone();
  rope1.rotation.y = Math.PI * 15 / 36;
  rope1.position.x = 420;
  rope1.position.y = 115;
  rope1.position.z = 115;

  let rope2 = meshRope.clone();
  rope2.rotation.y = Math.PI * 9 / 36;
  rope2.position.x = 308;
  rope2.position.y = 115;
  rope2.position.z = 308;

  let rope3 = meshRope.clone();
  rope3.rotation.y = Math.PI * 3 / 36;
  rope3.position.x = 115;
  rope3.position.y = 115;
  rope3.position.z = 420;

  let rope4 = meshRope.clone();
  rope4.rotation.y = - Math.PI * 3 / 36;
  rope4.position.x = - 115;
  rope4.position.y = 115;
  rope4.position.z = 420;

  let rope5 = meshRope.clone();
  rope5.rotation.y = - Math.PI * 9 / 36;
  rope5.position.x = - 308;
  rope5.position.y = 115;
  rope5.position.z = 308;

  let rope6 = meshRope.clone();
  rope6.rotation.y = - Math.PI * 15 / 36;
  rope6.position.x = - 420;
  rope6.position.y = 115;
  rope6.position.z = 115;

  let rope7 = meshRope.clone();
  rope7.rotation.y = Math.PI * 15 / 36;
  rope7.position.x = - 420;
  rope7.position.y = 115;
  rope7.position.z = - 115;

  let rope8 = meshRope.clone();
  rope8.rotation.y = Math.PI * 9 / 36;
  rope8.position.x = - 308;
  rope8.position.y = 115;
  rope8.position.z = - 308;

  let rope9 = meshRope.clone();
  rope9.rotation.y = Math.PI * 3 / 36;
  rope9.position.x = - 115;
  rope9.position.y = 115;
  rope9.position.z = - 420;

  let rope10 = meshRope.clone();
  rope10.rotation.y = - Math.PI * 3 / 36;
  rope10.position.x = 115;
  rope10.position.y = 115;
  rope10.position.z = - 420;

  let rope11 = meshRope.clone();
  rope11.rotation.y = - Math.PI * 9 / 36;
  rope11.position.x = 308;
  rope11.position.y = 115;
  rope11.position.z = - 308;

  let rope12 = meshRope.clone();
  rope12.rotation.y = - Math.PI * 15 / 36;
  rope12.position.x = 420;
  rope12.position.y = 115;
  rope12.position.z = - 115;

  let ropes = new THREE.Group();
  ropes.add(rope1);
  ropes.add(rope2);
  ropes.add(rope3);
  ropes.add(rope4);
  ropes.add(rope5);
  ropes.add(rope6);
  ropes.add(rope7);
  ropes.add(rope8);
  ropes.add(rope9);
  ropes.add(rope10);
  ropes.add(rope11);
  ropes.add(rope12);

  //sign
  let geometryBottom = new THREE.BoxGeometry( 230, 120, 20 );
  let materialBottom = new THREE.MeshLambertMaterial( {color: 0xa0e8e5} );
  let bottom = new THREE.Mesh( geometryBottom, materialBottom );
  
  let geometryTop = new THREE.BoxGeometry( 200, 100, 10 );
  let materialTop = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let top = new THREE.Mesh( geometryTop, materialTop );
  top.position.z = 6;

  let board = new THREE.Group();
  board.add(bottom);
  board.add(top);
  board.rotation.x = - Math.PI / 4;
  board.position.x = -200;
  board.position.y = 160;
  board.position.z = 450;

  let geometryStand = new THREE.CylinderGeometry( 10, 10, 250, 32 );
  let materialStand = new THREE.MeshLambertMaterial( {color: 0xa0e8e5} );
  let cylinderStand = new THREE.Mesh( geometryStand, materialStand );
  cylinderStand.position.x = -200;
  cylinderStand.position.y = 30;
  cylinderStand.position.z = 450;

  let sign = new THREE.Group();
  sign.add(board);
  sign.add(cylinderStand);
  sign.position.x = -50;
  sign.position.z = 60;

  //light
  let light = new THREE.PointLight( 0xffffff, 0.6, 1000 );
  light.position.set( 0, 300, 0 );
  //let pointLightHelper = new THREE.PointLightHelper( light, 1000 );

  let lightSign = new THREE.PointLight( 0xffffff, 0.7, 500 );
  lightSign.position.set( -200, 400, 550 );
  //let pointLightHelperSign = new THREE.PointLightHelper( lightSign, 500 );

  let stage = new THREE.Group();
  stage.add(cylinderPlatform);
  stage.add(pillars);
  stage.add(ropes);
  stage.add(sign);
  stage.add(light);
  //stage.add(pointLightHelper);
  stage.add(lightSign);
  //stage.add(pointLightHelperSign);

  return stage;
}