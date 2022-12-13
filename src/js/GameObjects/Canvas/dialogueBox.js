import { CanvasElement } from "../../Components/UI/canvasElement.js";
import { CanvasLerpable } from "../../Components/UI/CanvasLerpable.js";
import { CanvasSelectable } from "../../Components/UI/canvasSelectable.js"
import { CanvasImage } from "../../Components/UI/canvasImage.js"
import { CanvasText } from "../../Components/UI/canvasText.js";

var paths = {
    dialogueBox: "/assets/images/dialogue-box.png",
    dialogueButton: "/assets/images/ok.png",
};

export class DialogueBox extends CanvasElement {

    constructor(x, y, context, gameCanvas) {
        super(x, y, 0, 0, "", context);
        gameCanvas.addElement(this);
        this.lerpable = new CanvasLerpable(this, gameCanvas);

        this.dialogueBox = new CanvasImage(0, 0, 1024, 256, context, paths.dialogueBox);
        this.dialogueText = new CanvasText(130, 100, 200, 64, context, "This is a really cool text");
        
        this.dialogueOk = new CanvasImage(750, 200, 64, 64, context, paths.dialogueButton);
        var canvasSelectable = new CanvasSelectable(this.dialogueOk, gameCanvas);
        canvasSelectable.clicked = () => {
        };

        this.dialogueBox.setParent(this);
        this.dialogueOk.setParent(this);
        this.dialogueText.setParent(this);
    }
}