import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { PauseMenu } from "./PauseMenu";

interface KeyState {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  " ": boolean;
  Shift: boolean;
  [key: string]: boolean;
}

export class Controls {
  private controls: PointerLockControls;
  private keys: KeyState;
  private moveSpeed: number = 0.1;
  private pauseMenu: PauseMenu;
  public isPaused: boolean = false;
  private camera: THREE.PerspectiveCamera;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.controls = new PointerLockControls(camera, document.body);
    this.pauseMenu = new PauseMenu(this);
    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      " ": false,
      Shift: false,
    };

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    document.addEventListener("click", (e: MouseEvent) => {
      if (
        !this.isPaused &&
        e.target instanceof Element &&
        !this.pauseMenu.contains(e.target)
      ) {
        this.controls.lock();
      }
    });

    this.controls.addEventListener("lock", () => {
      this.pauseMenu.hide();
      this.isPaused = false;
    });

    this.controls.addEventListener("unlock", () => {
      this.pauseMenu.show();
      this.isPaused = true;
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key in this.keys) {
        this.keys[e.key] = true;
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key in this.keys) {
        this.keys[e.key] = false;
      }
    });
  }

  public update(): void {
    if (this.keys.w) this.controls.moveForward(this.moveSpeed);
    if (this.keys.s) this.controls.moveForward(-this.moveSpeed);
    if (this.keys.a) this.controls.moveRight(-this.moveSpeed);
    if (this.keys.d) this.controls.moveRight(this.moveSpeed);

    if (this.keys[" "]) this.camera.position.y += this.moveSpeed;
    if (this.keys["Shift"]) this.camera.position.y -= this.moveSpeed;
  }

  public lock(): void {
    this.controls.lock();
  }
}
