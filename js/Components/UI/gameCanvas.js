import { CanvasElement } from "./canvasElement.js";
export class GameCanvas {

    constructor(context) {

        this.context = context;
        this.root = new CanvasElement(0, 0, 0, 0, "", context);
        this.selectables = [];
        this.lerpables = [];


        this.lastUpdate = Date.now();
        setInterval(() => {

            var deltaTime = Date.now() - this.lastUpdate;
            this.lastUpdate = Date.now();
            this.updateLerp(deltaTime * 0.001);
            this.drawElements();
        }, 1 / 15);


    }

    addElement(newCanvasElement) {

        newCanvasElement.setParent(this.root);
    }

    updateLerp(deltaTime) {
        this.lerpables.forEach(element => {
            element.updateLerp(deltaTime);
        });
    }

    notifyClick(down, x, y) {
        this.selectables.forEach(selectable => {
            selectable.notifyClick(down, x, y);
        });
    }

    notifyMove(x, y) {
        this.selectables.forEach(selectable => {
            selectable.notifyMove(x, y);
        });
    }

    drawElements() {
        this.context.clearRect(0, 0, 1920, 1080);
        this.root.render(0, 0);

    }
}
