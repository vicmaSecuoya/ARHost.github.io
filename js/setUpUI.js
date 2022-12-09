import { GameCanvas } from "./Components/UI/gameCanvas.js"
import { CharacterSelection } from "./GameObjects/Canvas/characterSelection.js";

const LeftTopPosition = [0, 0]
const TopPosition = [960, 0]
const RightTopPosition = [1920, 0]

const LeftBotPosition = [0, 1080]
const BotPosition = [960, 1080]
const RightBotPosition = [1920, 1080]

const LeftPosition = [0, 540]
const RightPosition = [1920, 540]

const centerPosition = [960, 540]

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


initCanvas();

function initCanvas() {
    var myMenu = new CharacterSelection(0, 0, context, gameCanvas);
    
    myMenu.display();
}