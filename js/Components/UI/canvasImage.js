import { CanvasElement } from "./canvasElement.js";

export class CanvasImage extends CanvasElement {
    constructor(x, y, width, height, context, imagePath) {
        super(x, y, width, height, context);

        this.image = new Image();
        if (imagePath != "") {
            this.image.src = imagePath;
        }
    }

    renderSelf(worldX, worldY) {
        this.context.drawImage(this.image, worldX, worldY, this.width, this.height);
    }
}
