import * as THREE from "three";

export class Lighting {
  constructor(scene: THREE.Scene) {
    // Add ambient light (slightly brighter)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Main directional light (from front-right-top)
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(10, 10, 10);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 1024;
    directionalLight1.shadow.mapSize.height = 1024;
    scene.add(directionalLight1);

    // Secondary directional light (from back-left)
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    // directionalLight2.position.set(-5, 5, -5);
    // directionalLight2.castShadow = false;
    // directionalLight2.shadow.mapSize.width = 1024;
    // directionalLight2.shadow.mapSize.height = 1024;
    // scene.add(directionalLight2);

    // // Fill light (from front-left)
    // const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.3);
    // directionalLight3.position.set(-5, 5, 5);
    // directionalLight3.castShadow = false;
    // directionalLight3.shadow.mapSize.width = 1024;
    // directionalLight3.shadow.mapSize.height = 1024;
    // scene.add(directionalLight3);
  }
}
