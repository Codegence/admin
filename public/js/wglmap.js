// connection
var host = "172.17.201.138:8080";
var httphost = "http://" + host;
var socket;

// orbit controls
var clock = new THREE.Clock();

// 3d
var container;
var camera, controls, scene, renderer;
var objects = [];
var models = [];
var lights = [];
var scale = 17;
var cameraTarget;
var plane, material;
var modelsPath = 'wglmodels/';

$(document).ready(function() {
	// Init 3D environment
	init();
	
	// Setup connection
	setup(window.location.search.split('=')[1]);
	
	// Animate 3D
	animate();
	
	// Add keydown handler for arrows navigation 
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
});

// Setup connection
function setup(sectorId){
	connect("ws://" + host + "/sectors/" + sectorId + "/overseer");
	$('body').on('initSector', handleInitSector);
	$('body').on('updateSector', handleUpdateSector);
}

function connect(host){
    try{
        socket = new WebSocket(host);
        socket.binaryType = 'arraybuffer';

        socket.onopen = function(evt){
            console.log("Socket open");
        }

        socket.onmessage = function(evt){
            var inflated = pako.inflate(new Uint8Array(evt.data));
            var str = "";
            for (var i=0; i<inflated.length; i++)
                str += String.fromCharCode(inflated[i]);
            var payload = JSON.parse(str);
            $('body').trigger(payload.event, payload.data);
        }

        socket.onclose = function(evt){
            console.log("Socket close");
        }

        socket.onError = function(evt){
            console.log("Socket error");
        }
    } catch(exception){
        alert(exception);
    }
}

// Initialization handler
function handleInitSector(event, data) {
	// Add terrain
	width = data.width * scale;
	height = data.height * scale;
	plane = new THREE.Mesh(new THREE.PlaneGeometry( width, height, 1, 1 ), material );
	plane.position.set(width/2, 0, height/2);
	plane.rotation.set(-Math.PI/2, 0, 0);
	scene.add( plane );

	// Add objects
    $(data.objects).each(function(i, val) {
		if(val.type=='rock'){
			if(Math.random()<0.5){
				val.type='rock_01';
			}else{
				val.type='rock_02';
			}
		}
		objects[val.id] = models[val.type].clone();
		objects[val.id].position.set(val.position[0]*scale, 0, val.position[1]*scale);
		objects[val.id].rotation.set(0, val.rotation, 0);
		objects[val.id].type = val.type;
		scene.add(objects[val.id]);
    });
}

// Update handler
function handleUpdateSector(event, data) {
	// Remove deleted objects
    $(data.deletedObjects).each(function(i, val) {
		scene.remove(objects[val.id]);
    });
	
	// Add new objects
    $(data.newObjects).each(function(i, val) {
		if(val.type=='rock'){
			if(Math.random()<0.5){
				val.type='rock_01';
			}else{
				val.type='rock_02';
			}
		}
		objects[val.id] = models[val.type].clone();
		objects[val.id].position.set(val.position[0]*scale, 0, val.position[1]*scale);
		objects[val.id].rotation.set(0, val.rotation, 0);
		objects[val.id].type = val.type;
		scene.add(objects[val.id]);
    });
	
	// Update existing objects
    $(data.objects).each(function(i, val) {
		if(val.position){
			objects[val.id].position.set(val.position[0]*scale, 0, val.position[1]*scale);
		}
		if(val.rotation){
			objects[val.id].rotation.set(0, val.rotation, 0);
		}
    });
}

// Keyboard navigation
function onDocumentKeyDown(event){
	switch(event.keyCode){
		case 37:
			cameraTarget.position.set(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z - 20);
			break;
		case 38:
			cameraTarget.position.set(cameraTarget.position.x - 20, cameraTarget.position.y, cameraTarget.position.z);
			break;
		case 39:
			cameraTarget.position.set(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z + 20);
			break;
		case 40:
			cameraTarget.position.set(cameraTarget.position.x + 20, cameraTarget.position.y, cameraTarget.position.z);
			break;
	}
}

function init() {
	// DOM elements
	container = document.createElement('div');
	document.body.appendChild(container);

	// Camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(-255, 404, 427);//y,z,x

	// Scene
	scene = new THREE.Scene();
	
	// Controls
	controls = new THREE.OrbitControls(camera);
	controls.center.set(115, 192, 443);
	controls.userPanSpeed = 100;

	// Terrain plane
	var texture = THREE.ImageUtils.loadTexture(modelsPath + 'maps/terrain.jpg');
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );
	material = new THREE.MeshLambertMaterial( {color: 0xc0c0c0, map:texture} );
	
	// Ambient light
	var ambient = new THREE.AmbientLight(0x202020);
	scene.add(ambient);

	// Directional light
	var directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(-20, 100, -20);
	scene.add(directionalLight);

	// Loading manager
	var manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};
	
	// Models loader
	var loader = new THREE.OBJMTLLoader(manager);
	loader.load(modelsPath + 'bullet.obj', modelsPath + 'bullet.mtl', function(object) { models['bullet'] = object; });
	loader.load(modelsPath + 'rock_01.obj', modelsPath + 'rock_01.mtl', function(object) { models['rock_01'] = object; });
	loader.load(modelsPath + 'rock_02.obj', modelsPath + 'rock_02.mtl', function(object) { models['rock_02'] = object; });
	loader.load(modelsPath + 'resource.obj', modelsPath + 'resource.mtl', function(object) { models['resource'] = object;	});
	loader.load(modelsPath + 'drone.obj', modelsPath + 'drone.mtl', function(object) { models['drone'] = object; });
	models['terminator'] = new THREE.Object3D();
	loader.load(modelsPath + 'terminator_body.obj', modelsPath + 'terminator_body.mtl', function(object) { object.name = 'terminator_body'; models['terminator'].add(object); });
	loader.load(modelsPath + 'terminator_turret.obj', modelsPath + 'terminator_turret.mtl', function(object) { object.name = 'terminator_turret'; models['terminator'].add(object);	});
	loader.load(modelsPath + 'recycler.obj', modelsPath + 'recycler.mtl', function(object) { models['recycler'] = object; });

	// Setup render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// Events
	window.addEventListener('resize', onWindowResize, false);
}

// Update viewport on windows resize
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.handleResize();
}

// Animation
function animate() {
	requestAnimationFrame(animate);
	render();
}

// Render
function render() {
	controls.update( clock.getDelta() );
	renderer.render(scene, camera);
}
