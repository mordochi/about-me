import * as THREE from 'three';

export default function createTree(scene) {
  let leaves = [];
  for(let j = 0; j < 3; j++) {
    let radius = 70 + Math.floor((Math.random() * 100));
    if(j === 0) {
      radius = 230 + Math.floor((Math.random() * 100));
    }

    let geometryLeaves = new THREE.SphereGeometry( radius, 32, 32 );
    for (var i = 0; i < geometryLeaves.vertices.length; i++) {
      var vertex = geometryLeaves.vertices[i];
      if(vertex.y < -(radius * 2 / 3)) {
        vertex.y = -(radius * 2 / 3);
      }
      vertex.z += Math.random() * 30;
      vertex.x += Math.random() * 30;
      vertex.y += Math.random() * 40; 
    }

    geometryLeaves.computeFaceNormals();
    geometryLeaves.computeVertexNormals();
    
    let materialLeaves = new THREE.MeshLambertMaterial( {color: 0xd8d529} );
    let sphereLeaves = new THREE.Mesh( geometryLeaves, materialLeaves );
    leaves.push(sphereLeaves);
  }

  let woods = [];
  let geometryTrunk = new THREE.CylinderGeometry( 20, 40, 700, 32 );
  let materialTrunk = new THREE.MeshLambertMaterial( {color: 0xce8002} );
  let cylinderTrunk = new THREE.Mesh( geometryTrunk, materialTrunk );
  woods.push(cylinderTrunk);

  for(let j = 0; j < 2; j++) {
    let radius = 5 + Math.floor((Math.random() * 10));
    let geometryBranch = new THREE.CylinderGeometry( radius, radius + 5, 200, 32 );
    let materialBranch = new THREE.MeshLambertMaterial( {color: 0xce8002} );
    let cylinderBranch = new THREE.Mesh( geometryBranch, materialBranch );
    woods.push(cylinderBranch);
  }

  let leaveAndWood = [];
  leaves.forEach((leave, index) => {
    let combination = new THREE.Group();
    combination.add(leave);
    woods[index].position.y = - woods[index].geometry.parameters.height / 1.5;
    combination.add(woods[index]);
    leaveAndWood.push(combination);
  });

  leaveAndWood[0].position.y = 800;

  let random = Math.floor((Math.random() * 2));
  leaveAndWood[1].rotation.z = random ? Math.PI * 2 / 9 : (- Math.PI * 2 / 9);
  leaveAndWood[1].position.x = random ? -170 : 170;
  leaveAndWood[1].position.y = 500 + Math.floor((Math.random() * 150));
  
  leaveAndWood[2].rotation.z = random ? (- Math.PI * 2 / 9) : Math.PI * 2 / 9;
  leaveAndWood[2].position.x = random ? 170 : -170;
  leaveAndWood[2].position.y = 500 + Math.floor((Math.random() * 150));

  let tree = new THREE.Group();
  leaveAndWood.forEach((part) => tree.add(part));
  
  return tree;
}