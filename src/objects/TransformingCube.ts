import * as THREE from "three";

export class TransformingCube {
  private cube: THREE.Mesh;
  private tetrahedrons: THREE.Mesh[] = [];
  private isTransforming: boolean = false;
  private transformationProgress: number = 0;
  private readonly transformationDuration: number = 2; // seconds
  private readonly cubeSize: number = 1;
  private initialTetraPositions: THREE.Vector3[] = [];
  private targetTetraPositions: THREE.Vector3[] = [];

  constructor(scene: THREE.Scene) {
    // Create cube
    const cubeGeometry = new THREE.BoxGeometry(
      this.cubeSize,
      this.cubeSize,
      this.cubeSize
    );
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d5ff,
      roughness: 0.4,
      metalness: 0.6,
    });

    this.cube = new THREE.Mesh(cubeGeometry, material);
    this.cube.position.y = 2; // Float above ground
    scene.add(this.cube);

    // Create tetrahedrons (initially hidden)
    const halfSize = this.cubeSize / 2;

    // Cube corner positions and their corresponding directions
    const corners = [
      {
        pos: new THREE.Vector3(-halfSize, -halfSize, -halfSize),
        rot: new THREE.Euler(0, Math.PI * 0.25, 0),
      },
      {
        pos: new THREE.Vector3(halfSize, -halfSize, -halfSize),
        rot: new THREE.Euler(0, -Math.PI * 0.25, 0),
      },
      {
        pos: new THREE.Vector3(-halfSize, halfSize, -halfSize),
        rot: new THREE.Euler(0, Math.PI * 0.25, Math.PI),
      },
      {
        pos: new THREE.Vector3(halfSize, halfSize, -halfSize),
        rot: new THREE.Euler(0, -Math.PI * 0.25, Math.PI),
      },
      {
        pos: new THREE.Vector3(-halfSize, -halfSize, halfSize),
        rot: new THREE.Euler(0, -Math.PI * 0.75, 0),
      },
      {
        pos: new THREE.Vector3(halfSize, -halfSize, halfSize),
        rot: new THREE.Euler(0, Math.PI * 0.75, 0),
      },
      {
        pos: new THREE.Vector3(-halfSize, halfSize, halfSize),
        rot: new THREE.Euler(0, -Math.PI * 0.75, Math.PI),
      },
      {
        pos: new THREE.Vector3(halfSize, halfSize, halfSize),
        rot: new THREE.Euler(0, Math.PI * 0.75, Math.PI),
      },
    ];

    // Create and position tetrahedrons
    corners.forEach(({ pos, rot }) => {
      const tetraGeometry = this.createRightTetrahedron(halfSize);
      const tetra = new THREE.Mesh(tetraGeometry, material.clone());

      // Set initial position and rotation
      tetra.position.copy(this.cube.position).add(pos);
      tetra.rotation.copy(rot);
      tetra.visible = false;

      this.tetrahedrons.push(tetra);
      scene.add(tetra);

      // Store initial position
      this.initialTetraPositions.push(new THREE.Vector3().copy(tetra.position));

      // Calculate target position (moved outward diagonally)
      const direction = pos.clone().normalize();
      const targetPos = new THREE.Vector3()
        .copy(tetra.position)
        .add(direction.multiplyScalar(this.cubeSize));
      this.targetTetraPositions.push(targetPos);
    });

    // Add keyboard listener
    // document.addEventListener("keydown", (event) => {
    //   if (event.key.toLowerCase() === "g" && !this.isTransforming) {
    //     this.startTransformation();
    //   }
    // });
  }

  private createRightTetrahedron(size: number): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    // Vertices for a right tetrahedron
    const vertices = new Float32Array([
      0,
      0,
      0, // right angle vertex
      size,
      0,
      0, // base vertex 1
      0,
      size,
      0, // base vertex 2
      0,
      0,
      size, // base vertex 3
    ]);

    // Faces (triangles)
    const indices = new Uint16Array([0, 2, 1, 0, 3, 2, 0, 1, 3, 1, 2, 3]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    return geometry;
  }

  private startTransformation(): void {
    this.isTransforming = true;
    this.transformationProgress = 0;
    this.tetrahedrons.forEach((tetra) => {
      tetra.visible = true;
    });
  }

  update(deltaTime: number): void {
    if (!this.isTransforming) {
      // Gentle floating motion for the cube
      this.cube.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.1;
      this.cube.rotation.y += deltaTime * 0.2;
      return;
    }

    // Update transformation progress
    this.transformationProgress = Math.min(
      this.transformationProgress + deltaTime / this.transformationDuration,
      1
    );

    // Update positions
    this.tetrahedrons.forEach((tetra, i) => {
      // Position interpolation
      tetra.position.lerpVectors(
        this.initialTetraPositions[i],
        this.targetTetraPositions[i],
        this.transformationProgress
      );
    });

    // Fade out cube
    const material = this.cube.material as THREE.MeshStandardMaterial;
    material.opacity = 1 - this.transformationProgress;
    material.transparent = true;
  }
}
