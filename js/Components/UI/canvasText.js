import { CanvasElement } from "./canvasElement.js";

export class CanvasText extends CanvasElement {
    constructor(x, y, context, text) {
        super(x, y, context);

        this.context.font = "40px Verdana";

        this.width = context.measureText(text).width;

        this.height = 40;

        //Reset x and y. super.contructor must be called first :/
        this.moveTo(x, y);
        this.text = text;
    }

    renderSelf(worldX, worldY) {

        this.context.font = "40px Verdana";
        this.context.fillText(this.text, worldX - this.width * 0.5, worldY - this.height * 0.5);
    }
}
