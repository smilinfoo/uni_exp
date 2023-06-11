import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import monkey from './models/test_tpm.gltf';
import stars from './models/stars.gltf';

export default function App(_container){

    let renderer, container, scene, camera;
    let geometry, material, meshes;

    renderer = new THREE.WebGLRenderer(  );

    if ( renderer.capabilities.isWebGL2 === false && renderer.extensions.has( 'ANGLE_instanced_arrays' ) === false ) {
        document.getElementById( 'notSupported' ).style.display = '';
        return false;
    }

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);

    container = _container;
    container.classList.add('container');
    container.appendChild( renderer.domElement );

    init();


    function init(){

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x110012 );

        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
        camera.position.set( 5, 2, 18 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0.5, 0 );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;

        let geo = new THREE.SphereGeometry(0.1,1,1);
        let mat = new THREE.MeshBasicMaterial({color:0xff0000})
        let meshTracker = new THREE.Mesh(geo, mat);
        
        scene.add(meshTracker);

        //instances
        let pCount = 1000000;
        geometry = new THREE.SphereGeometry(0.1,1,1);
        geometry.computeVertexNormals();
        material =  new THREE.MeshNormalMaterial();

        const matrix = new THREE.Matrix4()
        const mesh = new THREE.InstancedMesh( geometry, material, pCount );

        for(let i = 0 ; i < pCount ; i++){
            
            randomizeMatrix( matrix );
            mesh.setMatrixAt( i, matrix );
            //console.log(i+' mats' + matrix.elements[0])
        }

        
        //scene.add(mesh)

        const loader = new GLTFLoader();
        loader.load(
            monkey,
            function ( gltf ) {

				const model = gltf.scene;
				model.position.set( 0, 0.4, 0 );
				model.scale.set( 10, 10, 10 );
				///scene.add( model );
                console.log(model.children[0].material)
                model.children[0].material.transparent = true;
                model.children[0].material.opacity = 0.6;
                model.children[0].material.blending = THREE.AdditiveBlending;
                addInstancesOfUni(model, scene);
                console.log('added' );
            },
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            function ( error ) {

                console.log( 'An error happened' );
                console.log( error );
        
            }
            
        );

        window.onresize = resize;
        resize();
        animate();

    }

    function resize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
        resize()
        requestAnimationFrame( animate );

        renderer.render( scene, camera );

    }  

    function randomizeMatrix(matrix) {

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

    function addInstancesOfUni(mesh, scne){
        var dummy = new THREE.Object3D()
        /*
        var childObject = mesh.scene.children[0];
        geometry = new THREE.InstancedBufferGeometry();
        THREE.BufferGeometry.prototype.copy.call( geometry, childObject.geometry );
        var defaultTransform = new THREE.Matrix4().multiply( new THREE.Matrix4().makeScale( 0.75, 0.75, 0.75 ) )
        geometry.applyMatrix4( defaultTransform ); 

        mesh = new THREE.InstancedMesh( geometry, material, itemCount );
        mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
    
        for ( var i = 0; i < itemCount; i++ ) { // Iterate and offset x pos
    
            var dummyOffset = -100*i;
            dummy.position.copy( new THREE.Vector3( 0,-15, dummyOffset ) );
            dummy.updateMatrix();
            mesh.setMatrixAt( i, dummy.matrix );
    
        }
    
        mesh.instanceMatrix.needsUpdate = true;
    
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        */
        var childObject = mesh.children[0];
        let positions = childObject.geometry.attributes.position.array;
        let pCount =  childObject.geometry.attributes.position.count;
        geometry = new THREE.SphereGeometry(0.01,5,5);
        geometry.computeVertexNormals();
        material =  new THREE.MeshNormalMaterial({transparent:true, opacity:0.4});
        material.blending = THREE.AdditiveBlending;

        const matrix = new THREE.Matrix4()
        const starMesh = new THREE.InstancedMesh( geometry, material, pCount );

        console.log(childObject);
        console.log(childObject.geometry);
        console.log(childObject.geometry.attributes);
        console.log(childObject.geometry.attributes.position);

        for(let i = 0 ; i < pCount ; i+=3){
            
            //randomizeMatrix( matrix );
            matrix.makeTranslation( positions[i] * 10, positions[i+1] * 10, positions[i+2] * 10)
            starMesh.setMatrixAt( i, matrix );
            //console.log(i+' mats' + matrix.elements[0])
        }

        scne.add(starMesh)
    }
}
