	if (WEBGL.isWebGLAvailable() === false) {
		document.body.appendChild(WEBGL.getWebGLErrorMessage());
	}
	var container, stats, controls;
	var camera, scene, renderer, light;
	init();
	animate();
	function init() {
		container = document.createElement('div');
		document.body.appendChild(container);
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.0001, 20);
		camera.position.set(- 1.8, 0.9, 2.7);
		controls = new THREE.OrbitControls(camera);
		controls.target.set(0, - 0.2, - 0.2);
		controls.update();

		scene = new THREE.Scene();
		light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
		light.position.set(0, 1, 0);
		scene.add(light);


		var loader = new THREE.GLTFLoader();
		loader.load('models/facultate_raw.gltf', function (gltf) {
			scene.add(gltf.scene);
		}, undefined, function (e) {
			console.error(e);
		});
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.gammaOutput = true;
		container.appendChild(renderer.domElement);
		window.addEventListener('resize', onWindowResize, false);

		stats = new Stats();
		container.appendChild(stats.dom);
	}
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		stats.update();
	}