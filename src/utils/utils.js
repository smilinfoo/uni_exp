export function randomizeMatrix(matrix) {

    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    position.x = Math.random() * 4 - 2;
    position.y = Math.random() * 4 - 2;
    position.z = Math.random() * 4 - 2;

    rotation.x = Math.random() * 2 * Math.PI;
    rotation.y = Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler( rotation );

    scale.x = scale.y = scale.z = Math.random() * 1;

    matrix.compose( position, quaternion, scale );

    
}
