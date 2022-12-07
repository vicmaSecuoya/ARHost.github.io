class GameCanvas {

    constructor() {

        this.root = new CanvasElement(0, 0, 0, 0, "");
        this.selectables = [];
    }

    addElement(newCanvasElement) {

        newCanvasElement.setParent(this.root);
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
        context.clearRect(0, 0, 1920, 1080);
        this.root.render(0, 0);

    }
}

class CanvasElement {
    constructor(x, y, width, height, imagePath) {
        this.localX = x;
        this.localY = y;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.context = null;
        this.ready = false;

        this.parent = null;
        this.children = []

        //Lerp
        this.lerpTime = 0;
        this.lerpElapsedTime = 0;
        this.lerpX = 0;
        this.lerpY = 0;
        this.leerping = false;


        if (imagePath != "") {

            this.image.src = imagePath;
            this.image.onload = function () {
                this.ready = true;
            }
        }
    }

    getPosition() {
        var offsetX = 0;
        var offsetY = 0;

        if (this.parent != undefined) {
            var parentCoords = this.parent.getPosition();

            offsetX = parentCoords[0] + offsetX;
            offsetY = parentCoords[1] + + offsetX;
        }
        return [this.localX + offsetX, this.localY + offsetY];
    }

    setParent(parent) {
        this.parent = parent;
        this.parent.children.push(this);

        //It only accepts one depth for now!
        this.localX -= parent.localX;
        this.localY -= parent.localY;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    lerp(targetX, targetY, speed) {

    }

    render(offsetX, offsetY) {
        offsetX += this.localX;
        offsetY += this.localY;
        context.drawImage(this.image, offsetX, offsetY, this.width, this.height);

        this.children.forEach(child => {
            child.render(offsetX, offsetY);
        });
    }
}

class CanvasSelectable {

    constructor(canvasElement, gameCanvas, context) {
        this.canvasElement = canvasElement;
        this.context = context;
        gameCanvas.selectables.push(this);
    }


    clicked() {

    }

    notifyClick(down, x, y) {
        var worldPosition = this.canvasElement.getPosition();
        // AABB
        if (worldPosition[0] <= x && worldPosition[1] <= y) {
            if ((worldPosition[1] + this.canvasElement.height >= y) && (worldPosition[0] + this.canvasElement.width >= x)) {
                this.clicked();
            }
        }
    }

    notifyMove(x, y) {

    }


}

const gameCanvas = new GameCanvas("gamecanvas");
var canvasElement = document.getElementById("gamecanvas");
const context = canvasElement.getContext('2d');

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

setInterval((time, deltaTime) => {

    gameCanvas.drawElements();
}, 1 / 15);


function initCanvas() {

    var dialoguePanel = new CanvasElement(0, 0, 0, 0, "");
    var dialogueBox = new CanvasElement(10, 10, 1024, 256, paths.dialogueBox);

    var dialogueOk = new CanvasElement(750, 200, 64, 64, paths.dialogueButton);
    var canvasSelectable = new CanvasSelectable(dialogueOk, gameCanvas, context);
    canvasSelectable.clicked = () => {
        console.log("yep");
    };
    gameCanvas.addElement(dialoguePanel);

    dialogueBox.setParent(dialoguePanel);
    dialogueOk.setParent(dialoguePanel);

    console.log("Ok!");
}