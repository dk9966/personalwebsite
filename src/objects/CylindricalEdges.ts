import * as THREE from "three";

export class CylindricalEdges {
  private edgeGroup: THREE.Group;
  private readonly edgeThickness: number = 0.02;
  private visible: boolean = true;

  constructor(size: number, startPosition: THREE.Vector3, scene: THREE.Scene) {
    this.edgeGroup = new THREE.Group();
    this.createEdges(size);
    this.edgeGroup.position.copy(startPosition);
    this.edgeGroup.visible = this.visible;
    scene.add(this.edgeGroup);
  }

  private createEdge(start: THREE.Vector3, end: THREE.Vector3): THREE.Mesh {
    const direction = end.clone().sub(start);
    const length = direction.length();

    // Create a cylinder
    const geometry = new THREE.CylinderGeometry(
      this.edgeThickness, // radiusTop
      this.edgeThickness, // radiusBottom
      length, // height
      8, // radialSegments
      1, // heightSegments
      false // openEnded
    );

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.8,
    });

    const edge = new THREE.Mesh(geometry, material);

    // Position and rotate the cylinder to connect the points
    edge.position.copy(start);
    edge.position.add(direction.multiplyScalar(0.5));
    edge.lookAt(end);
    edge.rotateX(Math.PI / 2);

    return edge;
  }

  private createEdges(size: number) {
    const s = size / 2;
    const vertices = [
      new THREE.Vector3(s, s, 0), // 0: top-right
      new THREE.Vector3(0, s, s), // 1: top-front
      new THREE.Vector3(-s, s, 0), // 2: top-left
      new THREE.Vector3(0, s, -s), // 3: top-back
      new THREE.Vector3(s, -s, 0), // 4: bottom-right
      new THREE.Vector3(0, -s, s), // 5: bottom-front
      new THREE.Vector3(-s, -s, 0), // 6: bottom-left
      new THREE.Vector3(0, -s, -s), // 7: bottom-back
      new THREE.Vector3(s, 0, s), // 8: middle-right-front
      new THREE.Vector3(-s, 0, s), // 9: middle-left-front
      new THREE.Vector3(s, 0, -s), // 10: middle-right-back
      new THREE.Vector3(-s, 0, -s), // 11: middle-left-back
    ];

    // Define edges by vertex pairs
    const edges = [
      // Top square
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      // Bottom square
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      // Front edges
      [1, 8],
      [8, 5],
      [5, 9],
      [9, 1],
      // Back edges
      [3, 10],
      [10, 7],
      [7, 11],
      [11, 3],
      // Middle edges
      [0, 8],
      [2, 9],
      [0, 10],
      [2, 11],
      [4, 8],
      [6, 9],
      [4, 10],
      [6, 11],
    ];

    // Create cylinder for each edge
    edges.forEach(([startIdx, endIdx]) => {
      const edge = this.createEdge(vertices[startIdx], vertices[endIdx]);
      this.edgeGroup.add(edge);
    });
  }

  public setPosition(position: THREE.Vector3): void {
    this.edgeGroup.position.copy(position);
  }

  public setRotation(rotation: THREE.Euler): void {
    this.edgeGroup.rotation.copy(rotation);
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
    this.edgeGroup.visible = visible;
  }

  public toggleVisible(): void {
    this.visible = !this.visible;
    this.edgeGroup.visible = this.visible;
  }

  public isVisible(): boolean {
    return this.visible;
  }
}
