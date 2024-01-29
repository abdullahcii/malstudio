let scene, renderer, camera;
let raycaster, mouse;
let brushSize = 0.5; 

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentMouseDown(event) {
    let geometry = new THREE.SphereGeometry(brushSize, 32, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let sphere = new THREE.Mesh(geometry, material);

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        let intersect = intersects[0];
        sphere.position.copy(intersect.point);
    } else {
        let pos = new THREE.Vector3();
        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(5); 
        pos.add(raycaster.ray.origin);
        sphere.position.copy(pos);
    }

    scene.add(sphere);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
animate();