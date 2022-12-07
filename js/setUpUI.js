import { GameCanvas } from "./Components/UI/gameCanvas.js"
import { CanvasElement } from "./Components/UI/canvasElement.js"
import { CanvasLerpable } from "./Components/UI/CanvasLerpable.js"
import { CanvasSelectable } from "./Components/UI/CanvasSelectable.js"
import { CanvasText } from "./Components/UI/canvasText.js";
import { CanvasImage } from "./Components/UI/canvasImage.js";
import { DialogueBox } from "./GameObjects/Canvas/dialogueBox.js";

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


initCanvas();



function initCanvas() {
    var myDialogue = new DialogueBox(0, 0, context, gameCanvas);

}