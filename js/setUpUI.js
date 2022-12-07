import { GameCanvas } from "/js/Components/UI/gameCanvas.js"
import { CanvasElement } from "/js/Components/UI/canvasElement.js"
import { CanvasLerpable } from "/js/Components/UI/CanvasLerpable.js"
import { CanvasSelectable } from "/js/Components/UI/CanvasSelectable.js"

const canvasElement = document.getElementById("gamecanvas");
const context = canvasElement.getContext('2d');

const gameCanvas = new GameCanvas(context);

canvasElement.addEventListener("mousedown", function (e) {
    gameCanvas.notifyClick(true, e.offsetX, e.offsetY);
});

canvasElement.addEventListener("mouseup", function (e) {
    gameCanvas.notifyClick(false);
});

canvasElement.addEventListener("mousemove", function (e) {
    gameCanvas.notifyMove(e.offsetX, e.offsetY);
});

var elapsedTime = 0;
var paths = {
    "dialogueBox": "/assets/images/dialogue-box.png",
    "dialogueButton": "/assets/images/ok.png",
};

initCanvas();



function initCanvas() {

    var dialoguePanel = new CanvasElement(0, 0, 0, 0, "", context);
    var panelLerpable = new CanvasLerpable(dialoguePanel, gameCanvas);

    var dialogueBox = new CanvasElement(10, 10, 1024, 256, paths.dialogueBox, context);

    var dialogueOk = new CanvasElement(750, 200, 64, 64, paths.dialogueButton, context);
    var canvasSelectable = new CanvasSelectable(dialogueOk, gameCanvas);
    canvasSelectable.clicked = () => {
        panelLerpable.lerpBySpeed(500, 200, 100);
    };
    gameCanvas.addElement(dialoguePanel);

    dialogueBox.setParent(dialoguePanel);
    dialogueOk.setParent(dialoguePanel);
}