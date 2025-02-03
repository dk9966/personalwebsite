import * as dat from "dat.gui";
import * as THREE from "three";
import HolographicMaterial from "../materials/HolographicMaterial";

export class HolographicTetrahedron {
  private mesh: THREE.Mesh;
  private material: HolographicMaterial;
  private initialTime: number;
  private gui!: dat.GUI;

  constructor(scene: THREE.Scene) {
    this.initialTime = performance.now() / 1000;

    // Create tetrahedron geometry
    const geometry = new THREE.TetrahedronGeometry(1, 0);

    // Create holographic material with custom parameters
    this.material = new HolographicMaterial({
      fresnelOpacity: 0.5,
      fresnelAmount: 0.45,
      scanlineSize: 15.0,
      hologramBrightness: 1.2,
      signalSpeed: 0.45,
      hologramColor: "#00d5ff",
      enableBlinking: true,
      blinkFresnelOnly: true,
      hologramOpacity: 0.6,
      depthTest: false,
    });

    // Create mesh
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(2, 2, 0); // Move right(x:2) and up(y:2)
    this.mesh.castShadow = false; // Disable shadow casting

    scene.add(this.mesh);

    // Setup GUI
    this.setupGUI();
  }

  private setupGUI() {
    this.gui = new dat.GUI({ width: 300 });

    // Create a folder for hologram parameters
    const hologramFolder = this.gui.addFolder("Tetrahedron Settings");

    // Add controls for each uniform
    hologramFolder
      .add(this.material.uniforms.fresnelOpacity, "value", 0, 1)
      .name("Fresnel Opacity")
      .onChange((value: number) => {
        this.material.uniforms.fresnelOpacity.value = value;
      });

    hologramFolder
      .add(this.material.uniforms.fresnelAmount, "value", 0, 1)
      .name("Fresnel Amount")
      .onChange((value: number) => {
        this.material.uniforms.fresnelAmount.value = value;
      });

    hologramFolder
      .add(this.material.uniforms.scanlineSize, "value", 1, 30)
      .name("Scanline Size")
      .onChange((value: number) => {
        this.material.uniforms.scanlineSize.value = value;
      });

    hologramFolder
      .add(this.material.uniforms.hologramBrightness, "value", 0, 2)
      .name("Brightness")
      .onChange((value: number) => {
        this.material.uniforms.hologramBrightness.value = value;
      });

    hologramFolder
      .add(this.material.uniforms.signalSpeed, "value", 0, 2)
      .name("Signal Speed")
      .onChange((value: number) => {
        this.material.uniforms.signalSpeed.value = value;
      });

    hologramFolder
      .addColor({ color: "#00d5ff" }, "color")
      .name("Hologram Color")
      .onChange((value: string) => {
        this.material.uniforms.hologramColor.value = new THREE.Color(value);
      });

    hologramFolder
      .add(this.material.uniforms.enableBlinking, "value")
      .name("Enable Blinking")
      .onChange((value: boolean) => {
        this.material.uniforms.enableBlinking.value = value;
      });

    hologramFolder
      .add(this.material.uniforms.blinkFresnelOnly, "value")
      .name("Blink Fresnel Only")
      .onChange((value: boolean) => {
        this.material.uniforms.blinkFresnelOnly.value = value;
      });

    hologramFolder
      .add(this.material.uniforms.hologramOpacity, "value", 0, 1)
      .name("Opacity")
      .onChange((value: number) => {
        this.material.uniforms.hologramOpacity.value = value;
      });

    // Add animation controls
    const animationFolder = this.gui.addFolder("Animation Settings");
    const animationSettings = {
      rotationSpeedY: 0.5,
      rotationSpeedX: 0.3,
      floatHeight: 0.2,
      floatSpeed: 1.0,
    };

    animationFolder
      .add(animationSettings, "rotationSpeedY", 0, 2)
      .name("Rotation Speed Y")
      .onChange((value: number) => {
        this.rotationSpeedY = value;
      });

    animationFolder
      .add(animationSettings, "rotationSpeedX", 0, 2)
      .name("Rotation Speed X")
      .onChange((value: number) => {
        this.rotationSpeedX = value;
      });

    animationFolder
      .add(animationSettings, "floatHeight", 0, 1)
      .name("Float Height")
      .onChange((value: number) => {
        this.floatHeight = value;
      });

    animationFolder
      .add(animationSettings, "floatSpeed", 0, 2)
      .name("Float Speed")
      .onChange((value: number) => {
        this.floatSpeed = value;
      });

    // Open folders by default
    hologramFolder.open();
    animationFolder.open();
  }

  // Animation properties
  private rotationSpeedY: number = 0.5;
  private rotationSpeedX: number = 0.3;
  private floatHeight: number = 0.2;
  private floatSpeed: number = 1.0;

  update() {
    const time = performance.now() / 1000 - this.initialTime;

    // Rotate the tetrahedron
    this.mesh.rotation.y = time * this.rotationSpeedY;
    this.mesh.rotation.x = time * this.rotationSpeedX;

    // Float up and down
    this.mesh.position.y =
      2 + Math.sin(time * this.floatSpeed) * this.floatHeight;

    // Update material
    this.material.update();
  }
}
