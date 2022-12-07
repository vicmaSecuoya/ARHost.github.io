import { CanvasElement } from "./canvasElement.js";

export class CanvasText extends CanvasElement {
    constructor(x, y, width, height, context, text) {
        super(x, y, width, height, context);

        this.text = text;
    }

    renderSelf(worldX, worldY) {
        this.context.font = "40px Verdana";
        this.context.fillText(this.text, worldX, worldY);
    }
}
