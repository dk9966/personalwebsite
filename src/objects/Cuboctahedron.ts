import * as THREE from "three";
import { CylindricalEdges } from "./CylindricalEdges";
import { RightTetrahedron } from "./RightTetrahedron";

export class Cuboctahedron {
  private mesh: THREE.Mesh;
  private startPosition: THREE.Vector3;
  private edges: CylindricalEdges;
  private tetrahedrons: RightTetrahedron[] = [];
  private readonly size: number = 1;
  private readonly corners: { pos: THREE.Vector3; rot: THREE.Euler }[];

  constructor(scene: THREE.Scene) {
    // Define corners configuration
    this.corners = [
      // Top corners
      {
        pos: new THREE.Vector3(this.size / 2, this.size / 2, this.size / 2), // top-right-front
        rot: new THREE.Euler(-Math.PI / 2, Math.PI, 0), // rotate 45° around Y
      },
      {
        pos: new THREE.Vector3(-this.size / 2, this.size / 2, this.size / 2), // top-left-front
        rot: new THREE.Euler(-Math.PI / 2, Math.PI / 2, 0), // rotate -45° around Y
      },
      {
        pos: new THREE.Vector3(this.size / 2, this.size / 2, -this.size / 2), // top-right-back
        rot: new THREE.Euler(Math.PI / 2, -Math.PI / 2, 0), // rotate 135° around Y
      },
      {
        pos: new THREE.Vector3(-this.size / 2, this.size / 2, -this.size / 2), // top-left-back
        rot: new THREE.Euler(Math.PI / 2, 0, 0), // rotate -135° around Y
      },
      // Bottom corners
      {
        pos: new THREE.Vector3(this.size / 2, -this.size / 2, this.size / 2), // bottom-right-front
        rot: new THREE.Euler(0, Math.PI, 0), // flip upside down + rotate 45° around Y
      },
      {
        pos: new THREE.Vector3(-this.size / 2, -this.size / 2, this.size / 2), // bottom-left-front
        rot: new THREE.Euler(-Math.PI / 2, 0, 0), // flip upside down + rotate -45° around Y
      },
      {
        pos: new THREE.Vector3(this.size / 2, -this.size / 2, -this.size / 2), // bottom-right-back
        rot: new THREE.Euler(Math.PI / 2, Math.PI, 0), // flip upside down + rotate 135° around Y
      },
      {
        pos: new THREE.Vector3(-this.size / 2, -this.size / 2, -this.size / 2), // bottom-left-back
        rot: new THREE.Euler(0, 0, 0), // flip upside down + rotate -135° around Y
      },
    ];

    // Create cuboctahedron geometry
    const geometry = this.createCuboctahedronGeometry();

    // Create material similar to the cube
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d5ff,
      roughness: 0.4,
      metalness: 0,
    });

    // Create mesh
    this.mesh = new THREE.Mesh(geometry, material);
    this.startPosition = new THREE.Vector3(3, 2, 0);
    this.mesh.position.copy(this.startPosition);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);

    // Create edges
    this.edges = new CylindricalEdges(this.size, this.startPosition, scene);

    // Create tetrahedrons at corners
    this.createTetrahedrons(scene);

    // Add keyboard event listener
    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "g") {
        this.tetrahedrons.forEach((tetra) => tetra.toggleExtension());
      }
    });
  }

  private createCuboctahedronGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const s = this.size / 2; // half-size for vertex positions

    // Vertices of a cuboctahedron
    const vertices = new Float32Array([
      // Square face vertices (top)
      s,
      s,
      0, // 0
      0,
      s,
      s, // 1
      -s,
      s,
      0, // 2
      0,
      s,
      -s, // 3

      // Square face vertices (bottom)
      s,
      -s,
      0, // 4
      0,
      -s,
      s, // 5
      -s,
      -s,
      0, // 6
      0,
      -s,
      -s, // 7

      // Front (+z)
      s,
      0,
      s, // 8
      -s,
      0,
      s, // 9

      // Back (-z)
      s,
      0,
      -s, // 10
      -s,
      0,
      -s, // 11
    ]);

    // Faces (triangles) - all in counter-clockwise order when viewed from outside
    const indices = new Uint16Array([
      // Top square face (2 triangles)
      0, 3, 1, 1, 3, 2,

      // Bottom square face (2 triangles) - viewed from below
      4, 5, 7, 5, 6, 7,

      // Front square face (2 triangles)
      1, 5, 8, 1, 9, 5,

      // Back square face (2 triangles) - viewed from back
      3, 10, 7, 3, 7, 11,

      // Right square face (2 triangles)
      0, 4, 10, 0, 8, 4,

      // Left square face (2 triangles) - viewed from left
      2, 11, 6, 2, 6, 9,

      // Top Front Right Corner
      0, 1, 8,
      // Top Front Left Corner
      1, 2, 9,

      // Top Back Right Corner
      3, 0, 10,
      // Top Back Left Corner
      2, 3, 11,

      // Bottom Front Right Corner
      4, 8, 5,
      // Bottom Front Left Corner
      5, 9, 6,

      // Bottom Back Right Corner
      4, 7, 10,
      // Bottom Back Left Corner
      6, 11, 7,
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    return geometry;
  }

  private createTetrahedrons(scene: THREE.Scene) {
    const tetraSize = this.size / 2;

    this.corners.forEach(({ pos, rot }) => {
      // Create new tetrahedron with local position
      const tetra = new RightTetrahedron(tetraSize, pos, scene);
      // Remove from scene and add as child of cuboctahedron
      scene.remove(tetra.getMesh());
      this.mesh.add(tetra.getMesh());
      tetra.setRotation(rot); // Set initial rotation
      this.tetrahedrons.push(tetra);
    });
  }

  update(deltaTime: number): void {
    // Rotate the cuboctahedron
    this.mesh.rotation.y += deltaTime * 0.5;

    // Gentle floating motion
    const newY = Math.sin(Date.now() * 0.001) * 0.1;
    this.mesh.position.y = this.startPosition.y + newY;

    // Update edges
    this.edges.setPosition(this.mesh.position);
    this.edges.setRotation(this.mesh.rotation);

    // Update tetrahedron extensions
    this.tetrahedrons.forEach((tetra) => tetra.updateExtension(deltaTime));
  }

  public toggleEdges(): void {
    this.edges.toggleVisible();
  }

  public setEdgesVisible(visible: boolean): void {
    this.edges.setVisible(visible);
  }

  public areEdgesVisible(): boolean {
    return this.edges.isVisible();
  }
}
