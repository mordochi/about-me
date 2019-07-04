import * as THREE from 'three';
import * as SubdivisionModifier from 'three-subdivision-modifier';

export default function createIceCreamVan(scene) {
  //body
  let geometryBody = new THREE.BoxGeometry( 500, 550, 850 );
  let materialBody = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let body = new THREE.Mesh( geometryBody, materialBody );

  let geometryBodyTop = new THREE.BoxGeometry( 500, 140, 230 );
  let materialBodyTop = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  let bodyTop = new THREE.Mesh( geometryBodyTop, materialBodyTop );
  bodyTop.position.y = 205;
  bodyTop.position.z = 515;

  let groupBody = new THREE.Group();
  groupBody.add(body);
  groupBody.add(bodyTop);

  //head
  let extrudeSettings = {
    steps: 5,
    depth: 500,
    bevelEnabled: false
  };

  let shape = new THREE.Shape( );
  shape.moveTo( -230, 135 );
  shape.lineTo( -50, 135 );
  shape.lineTo( 230, -80 ); 
  shape.lineTo(230, -275);
  shape.lineTo(-230, -275);
 
  let geometryHead = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  let materialHead = new THREE.MeshLambertMaterial( { color: 0xff5e5e} );
  let head = new THREE.Mesh( geometryHead, materialHead );
  head.rotation.y = - Math.PI / 2;
  head.position.x = 250;
  head.position.z = 655;

  let geometryFrontWindow = new THREE.BoxGeometry( 480, 230, 10 );
  let materialFrontWindow = new THREE.MeshLambertMaterial( {color: 0xa2f1f9} );
  let frontWindow = new THREE.Mesh( geometryFrontWindow, materialFrontWindow );
  frontWindow.position.y = 60;
  frontWindow.position.z = 700;
  frontWindow.rotation.x = - Math.PI / 3.4;

  let extrudeSettingsSideWindow = {
    steps: 5,
    depth: 10,
    bevelEnabled: false
  };

  let shapeSideWindow = new THREE.Shape( );
  shapeSideWindow.moveTo( -200, 120 );
  shapeSideWindow.lineTo( -50, 120 );
  shapeSideWindow.lineTo( 85, 20 ); 
  shapeSideWindow.lineTo( 85, -20 ); 
  shapeSideWindow.lineTo(-200, -20);
 
  let geometrySideWindow = new THREE.ExtrudeGeometry( shapeSideWindow, extrudeSettingsSideWindow );
  let materialSideWindow = new THREE.MeshLambertMaterial( { color: 0xa2f1f9} );
  let sideWindow = new THREE.Mesh( geometrySideWindow, materialSideWindow );
  sideWindow.rotation.y = - Math.PI / 2;
  sideWindow.position.z = 640;

  let sideWindowR = sideWindow.clone();
  sideWindowR.position.x = -245;

  let sideWindowL = sideWindow.clone();
  sideWindowL.position.x = 255;
  

  let groupHead = new THREE.Group();
  groupHead.add(head);
  groupHead.add(frontWindow);
  groupHead.add(sideWindowR);
  groupHead.add(sideWindowL);

  //tire
  let geometryTire = new THREE.CylinderGeometry( 110, 110, 80, 8, 3);

  let modifierTire = new SubdivisionModifier(2);
  geometryTire.mergeVertices();
  modifierTire.modify(geometryTire);
  geometryTire.faceVertexUvs[0].length = 0;

  let materialTire = new THREE.MeshBasicMaterial( {color: 0x000000} );
  let cylinderTire = new THREE.Mesh( geometryTire, materialTire );
  cylinderTire.rotation.z = Math.PI / 2;

  let geometryTireInner = new THREE.CylinderGeometry( 80, 80, 85, 8, 3);

  let modifierTireInner = new SubdivisionModifier(2);
  geometryTireInner.mergeVertices();
  modifierTireInner.modify(geometryTireInner);
  geometryTireInner.faceVertexUvs[0].length = 0;

  let materialTireInner = new THREE.MeshBasicMaterial( {color: 0xb2b2b2} );
  let cylinderTireInner = new THREE.Mesh( geometryTireInner, materialTireInner );
  cylinderTireInner.rotation.z = Math.PI / 2;

  let groupTireSingle = new THREE.Group();
  groupTireSingle.add(cylinderTire);
  groupTireSingle.add(cylinderTireInner);

  let cylinderTireRB = groupTireSingle.clone();
  cylinderTireRB.position.x = -220;
  cylinderTireRB.position.y = -260;
  cylinderTireRB.position.z = -250;

  let cylinderTireRF = groupTireSingle.clone();
  cylinderTireRF.position.x = -220;
  cylinderTireRF.position.y = -260;
  cylinderTireRF.position.z = 700;

  let cylinderTireLB = groupTireSingle.clone();
  cylinderTireLB.position.x = 220;
  cylinderTireLB.position.y = -260;
  cylinderTireLB.position.z = -250;

  let cylinderTireLF = groupTireSingle.clone();
  cylinderTireLF.position.x = 220;
  cylinderTireLF.position.y = -260;
  cylinderTireLF.position.z = 700;

  let groupTire = new THREE.Group();
  groupTire.add(cylinderTireRB);
  groupTire.add(cylinderTireRF);
  groupTire.add(cylinderTireLF);
  groupTire.add(cylinderTireLB);

  //ice cream
  let geometryScoop1 = new THREE.SphereGeometry( 200, 32, 32 );
  let materialScoop1 = new THREE.MeshBasicMaterial( {color: 0xffffd1} );
  let scoop1 = new THREE.Mesh( geometryScoop1, materialScoop1 );
  scoop1.position.y = 350;
  scoop1.position.z = 170;

  let geometryScoop2 = new THREE.SphereGeometry( 160, 32, 32 );
  let materialScoop2 = new THREE.MeshBasicMaterial( {color: 0x602e0e} );
  let scoop2 = new THREE.Mesh( geometryScoop2, materialScoop2 );
  scoop2.position.y = 430;
  scoop2.position.z = 370;

  //cone
  let geometryConeTop =new THREE.SphereGeometry( 160, 32, 32 );
  geometryConeTop.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 0.9, 1.0 ) );

  for (var i = 0; i < geometryConeTop.vertices.length; i++) {
    var vertex = geometryConeTop.vertices[i];
    if (vertex.y < 0) {
      vertex.y = 0;
    }
  }

  geometryConeTop.computeFaceNormals();
  geometryConeTop.computeVertexNormals();

  let materialConeTop = new THREE.MeshLambertMaterial( {color: 0xffb689} );
  let coneTop = new THREE.Mesh( geometryConeTop, materialConeTop );

  let geometryConeBottom = new THREE.ConeGeometry( 100, 400, 32 );
  let materialConeBottom = new THREE.MeshLambertMaterial( {color: 0xffb689} );
  let coneBottom = new THREE.Mesh( geometryConeBottom, materialConeBottom );
  coneBottom.position.y = 300;

  let groupCone = new THREE.Group();
  groupCone.add(coneTop);
  groupCone.add(coneBottom);
  groupCone.position.y = 460;
  groupCone.position.z = 440;
  groupCone.rotation.x = Math.PI / 2.8;

  let groupIceCream = new THREE.Group();
  groupIceCream.add(scoop1);
  groupIceCream.add(scoop2);
  groupIceCream.add(groupCone);

  //light
  let light = new THREE.PointLight( 0xffe08c, 0.5, 1000 );
  light.position.set( -600, 160, 240 );
  //let pointLightHelper = new THREE.PointLightHelper( light, 300 );


  let van = new THREE.Group();
  van.add(groupBody);
  van.add(groupHead);
  van.add(groupTire);
  van.add(groupIceCream);
  van.add(light);
  //van.add(pointLightHelper);

  return van;
}