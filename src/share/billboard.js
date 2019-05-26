import * as THREE from 'three';

export default function createBillboard(scene, color_board, color_others) {
  //右上板子
  let geometryRT = new THREE.BoxGeometry( 150, 300, 30 );
  let materialRT = new THREE.MeshLambertMaterial( { color: color_others} );
  let rightTop = new THREE.Mesh( geometryRT, materialRT );
  rightTop.lookAt(1, Math.pow(3, 0.5), 0);
  rightTop.position.y = (300 / 2 / 2) + (15 * Math.pow(3, 0.5) / 2);
  rightTop.position.x = (300 * Math.pow(3, 0.5) / 4) + (15 / 2);
  rightTop.receiveShadow = true;

  //左上板子
  let geometryLT = new THREE.BoxGeometry( 300, 300, 30 );
  let materialLT = new THREE.MeshLambertMaterial( { color: color_others} );
  let leftTop = new THREE.Mesh( geometryRT, materialRT );
  leftTop.lookAt(-1, Math.pow(3, 0.5), 0);
  leftTop.position.y = (300 / 2 / 2) + (15 * Math.pow(3, 0.5) / 2);
  leftTop.position.x = - ((300 * Math.pow(3, 0.5) / 4) + (15 / 2));
  leftTop.receiveShadow = true;

  //板子中間的填補
  let extrudeSettings = {
    steps: 5,
    depth: 150,
    bevelEnabled: false
  };

  let shape = new THREE.Shape( );
  shape.moveTo( -15, 0 );
  shape.lineTo( 15, 0 ); 
  shape.lineTo(0, - (15 * Math.pow(3, 0.5)));
 
  let geometryTop = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  let materialTop = new THREE.MeshLambertMaterial( { color: color_others} );
  let top = new THREE.Mesh( geometryTop, materialTop );
  top.position.y = (300 / 2) + (30 * Math.pow(3, 0.5) / 2);
  top.position.z = -75;
  top.receiveShadow = true;

  //告示牌身體
  let extrudeSettingsBoard = {
    steps: 5,
    depth: 30,
    bevelEnabled: false
  };

  let shapeBoard = new THREE.Shape( );
  shapeBoard.moveTo( 0, ((300 / 2)) );
  shapeBoard.lineTo( 120 * Math.pow(3, 0.5), ((300 / 2)) - 120 ); 
  shapeBoard.lineTo( 120 * Math.pow(3, 0.5), -170);
  shapeBoard.lineTo( - (120 * Math.pow(3, 0.5)), -170);
  shapeBoard.lineTo(- (120 * Math.pow(3, 0.5)), ((300 / 2)) - 120);

  let geometryBoard = new THREE.ExtrudeGeometry( shapeBoard, extrudeSettingsBoard );
  let materialBoard = new THREE.MeshLambertMaterial( { color: color_board} );
  let board = new THREE.Mesh( geometryBoard, materialBoard );
  board.position.z = -15;
  board.receiveShadow = true;

  //右腳
  let geometryPillarR = new THREE.CylinderGeometry( 20, 20, 400, 9 );
  let materialPillarR = new THREE.MeshLambertMaterial( { color: color_others} );
  let cylinderPillarR = new THREE.Mesh( geometryPillarR, materialPillarR );
  cylinderPillarR.position.x = 120 * Math.pow(3, 0.5);
  cylinderPillarR.position.y = -150;

  //左腳
  let geometryPillarL = new THREE.CylinderGeometry( 20, 20, 400, 9 );
  let materialPillarL = new THREE.MeshLambertMaterial( { color: color_others} );
  let cylinderPillarL = new THREE.Mesh( geometryPillarL, materialPillarL );
  cylinderPillarL.position.x = - 120 * Math.pow(3, 0.5);
  cylinderPillarL.position.y = -150;

  //light
  let light = new THREE.PointLight( 0xffffff, 0.6, 1000 );
  light.position.set( 50, -500, 200 );
  let pointLightHelper = new THREE.PointLightHelper( light, 300 );

  let billboard = new THREE.Group();
  billboard.add( rightTop );
  billboard.add( leftTop );
  billboard.add( top );
  billboard.add( board );
  billboard.add( cylinderPillarR );
  billboard.add( cylinderPillarL );
  billboard.add(light);
  //billboard.add(pointLightHelper);
  
  return billboard;
}