import { Controls } from "./Controls";

export class PauseMenu {
  private menu: HTMLDivElement;
  private controls: Controls;

  constructor(controls: Controls) {
    this.controls = controls;
    this.menu = this.createMenu();
    document.body.appendChild(this.menu);
  }

  private createMenu(): HTMLDivElement {
    const menu = document.createElement("div");
    menu.style.position = "fixed";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";
    menu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    menu.style.padding = "20px";
    menu.style.borderRadius = "10px";
    menu.style.display = "none";
    menu.style.color = "white";
    menu.style.fontFamily = "Arial, sans-serif";
    menu.style.textAlign = "center";

    const title = document.createElement("h2");
    title.textContent = "Game Paused";
    title.style.marginBottom = "20px";
    menu.appendChild(title);

    const resumeButton = document.createElement("button");
    resumeButton.textContent = "Back";
    resumeButton.style.padding = "10px 20px";
    resumeButton.style.fontSize = "16px";
    resumeButton.style.cursor = "pointer";
    resumeButton.style.backgroundColor = "#4CAF50";
    resumeButton.style.border = "none";
    resumeButton.style.borderRadius = "5px";
    resumeButton.style.color = "white";

    resumeButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.controls.isPaused) {
        this.controls.lock();
      }
    });

    menu.appendChild(resumeButton);
    return menu;
  }

  public show(): void {
    this.menu.style.display = "block";
  }

  public hide(): void {
    this.menu.style.display = "none";
  }

  public contains(element: Element): boolean {
    return this.menu.contains(element);
  }
}
