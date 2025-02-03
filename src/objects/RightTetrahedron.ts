import * as THREE from "three";

export class RightTetrahedron {
  private mesh: THREE.Mesh;
  private readonly size: number;
  private initialPosition: THREE.Vector3;
  private isExtended: boolean = false;
  private readonly EXTENSION_DISTANCE = 2; // How far to extend
  private currentExtension: number = 0;
  private readonly ANIMATION_SPEED = 2; // Units per second

  constructor(size: number, position: THREE.Vector3, scene: THREE.Scene) {
    this.size = size;
    this.initialPosition = position.clone();

    const geometry = this.createGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d5ff,
      roughness: 0.4,
      metalness: 0,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.copy(position);
    scene.add(this.mesh);
  }

  private createGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    // Create a right tetrahedron
    const vertices = new Float32Array([
      0,
      0,
      0, // right corner (apex)
      this.size,
      0,
      0, // left (x-axis)
      0,
      this.size,
      0, // top (y-axis)
      0,
      0,
      this.size, // right (z-axis)
    ]);

    const indices = new Uint16Array([
      0,
      2,
      1, // left face
      0,
      1,
      3, // front face
      0,
      3,
      2, // right face
      1,
      2,
      3, // equilateral face
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    return geometry;
  }

  // Getters and setters
  public getPosition(): THREE.Vector3 {
    return this.mesh.position.clone();
  }

  public setPosition(position: THREE.Vector3): void {
    this.mesh.position.copy(position);
  }

  public getRotation(): THREE.Euler {
    return this.mesh.rotation.clone();
  }

  public setRotation(rotation: THREE.Euler): void {
    this.mesh.rotation.copy(rotation);
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }

  public updateExtension(deltaTime: number): void {
    if (this.isExtended && this.currentExtension < this.EXTENSION_DISTANCE) {
      this.currentExtension = Math.min(
        this.currentExtension + this.ANIMATION_SPEED * deltaTime,
        this.EXTENSION_DISTANCE
      );
    } else if (!this.isExtended && this.currentExtension > 0) {
      this.currentExtension = Math.max(
        this.currentExtension - this.ANIMATION_SPEED * deltaTime,
        0
      );
    }

    // Update position based on extension
    const direction = this.initialPosition.clone().normalize();
    const extensionOffset = direction.multiplyScalar(this.currentExtension);
    this.mesh.position.copy(this.initialPosition.clone().add(extensionOffset));
  }

  public toggleExtension(): void {
    this.isExtended = !this.isExtended;
  }

  public setExtended(extended: boolean): void {
    this.isExtended = extended;
  }
}
