import * as THREE from "three";
import { Controls } from "../controls/Controls";
import { Cuboctahedron } from "../objects/Cuboctahedron";
import { Floor } from "./Floor";
import { Lighting } from "./Lighting";

export class Scene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: Controls;
  //   private transformingCube: TransformingCube;
  private cuboctahedron: Cuboctahedron;
  private lastTime: number = 0;

  constructor() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(3, 2, 0);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);

    // Initialize components
    new Floor(this.scene);
    new Lighting(this.scene);
    this.controls = new Controls(this.camera);
    // this.transformingCube = new TransformingCube(this.scene);
    this.cuboctahedron = new Cuboctahedron(this.scene);

    // Handle window resize
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  private handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  public animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    const currentTime = performance.now() / 1000;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (!this.controls.isPaused) {
      this.controls.update();
      //   this.transformingCube.update(deltaTime);
      this.cuboctahedron.update(deltaTime);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
