import { CanvasElement } from "../../Components/UI/canvasElement.js";
import { CanvasLerpable } from "../../Components/UI/CanvasLerpable.js";
import { CanvasSelectable } from "../../Components/UI/canvasSelectable.js"
import { CanvasImage } from "../../Components/UI/canvasImage.js"
import { CanvasText } from "../../Components/UI/canvasText.js";

var paths = {
    "dialogueBox": "/assets/images/dialogue-box.png",
    "dialogueButton": "/assets/images/ok.png",
};

export class DialogueBox extends CanvasElement {

    constructor(x, y, context, gameCanvas) {
        super(x, y, 0, 0, "", context);
        gameCanvas.addElement(this);
        var lerpable = new CanvasLerpable(this, gameCanvas);

        var dialogueBox = new CanvasImage(0, 0, 1024, 256, context, paths.dialogueBox);
        var dialogueText = new CanvasText(130, 100, 200, 64, context, "This is a really cool text");
        
        var dialogueOk = new CanvasImage(750, 200, 64, 64, context, paths.dialogueButton);
        var canvasSelectable = new CanvasSelectable(dialogueOk, gameCanvas);
        canvasSelectable.clicked = () => {
            lerpable.lerpBySpeed(500, 200, 100);
        };

        dialogueBox.setParent(this);
        dialogueOk.setParent(this);
        dialogueText.setParent(this);
    }
}