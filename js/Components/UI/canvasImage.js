import { CanvasElement } from "./canvasElement.js";

export class CanvasImage extends CanvasElement {
    constructor(x, y, context, width, height, imagePath) {
        super(x, y, context, width, height);

        this.image = new Image();
        if (imagePath != "") {
            this.image.src = imagePath;
        }
    }

    renderSelf(worldX, worldY) {
        this.context.drawImage(this.image, worldX - this.width * 0.5, worldY - this.height * 0.5, this.width, this.height);
    }

}
