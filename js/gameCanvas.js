class GameCanvas {

    constructor() {

        this.root = new CanvasElement(0, 0, 0, 0, "");
        this.selectables = [];
        this.lerpables = [];

        this.lastUpdate = Date.now();
        setInterval(() => {

            var deltaTime = Date.now() - this.lastUpdate;
            this.lastUpdate = Date.now();
            this.updateLerp(deltaTime * 0.001);
            this.drawElements();
        }, 1 / 15);


    }

    addElement(newCanvasElement) {

        newCanvasElement.setParent(this.root);
    }

    updateLerp(deltaTime) {
        this.lerpables.forEach(element => {
            element.updateLerp(deltaTime);
        });
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
            offsetY = parentCoords[1] + offsetY;
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

    moveTo(x, y) {
        this.localX = x;
        this.localY = y;
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

class CanvasLerpable {

    constructor(canvasElement, gameCanvas) {
        this.canvasElement = canvasElement;
        //Lerp
        this.targetTime = 0;
        this.elapsedTime = 0;

        this.startingX = 0;
        this.startingY = 0;

        this.targetX = 0;
        this.targetY = 0;

        this.lerping = false;

        gameCanvas.lerpables.push(this);
    }

    lerpBySpeed(worldTargetX, worldTargetY, speed) {
        var localCenter = this.canvasElement.parent.getPosition();
        //To local coords
        if (this.canvasElement.parent != undefined) {
            this.targetX = worldTargetX - localCenter[0];
            this.targetY = worldTargetY - localCenter[1];
        }

        var distance = Math.sqrt(Math.pow(this.targetX - this.canvasElement.localX, 2) + Math.pow(this.targetY - this.canvasElement.localY, 2));
        var time = distance / speed;
        
        this.lerpByTime(worldTargetX, worldTargetY, time);
    }

    lerpByTime(worldTargetX, worldTargetY, time) {
        var localCenter = this.canvasElement.parent.getPosition();
        //To local coords
        if (this.canvasElement.parent != undefined) {
            this.targetX = worldTargetX - localCenter[0];
            this.targetY = worldTargetY - localCenter[1];
        }

        //Unnecesary lerp, which might cause a division by 0.
        if (time < 0.01) {
            this.canvasElement.moveTo(this.targetX, this.targetY);
            return;
        }

        var startingPosition = this.canvasElement.getPosition();
        this.startingX = startingPosition[0];
        this.startingY = startingPosition[1];

        this.targetTime = time;
        this.elapsedTime = 0;

        this.lerping = true;
    }

    updateLerp(deltaTime) {
        if (this.lerping == false) return;
        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.targetTime) {
            this.elapsedTime = this.targetTime;
            this.lerping = false;
            console.log("done");
        }

        var t = this.elapsedTime / this.targetTime;
        var x = (1 - t) * this.startingX + t * this.targetX;
        var y = (1 - t) * this.startingY + t * this.targetY;

        this.canvasElement.moveTo(x, y);
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



function initCanvas() {

    var dialoguePanel = new CanvasElement(0, 0, 0, 0, "");
    var panelLerpable = new CanvasLerpable(dialoguePanel, gameCanvas);

    var dialogueBox = new CanvasElement(10, 10, 1024, 256, paths.dialogueBox);

    var dialogueOk = new CanvasElement(750, 200, 64, 64, paths.dialogueButton);
    var canvasSelectable = new CanvasSelectable(dialogueOk, gameCanvas, context);
    canvasSelectable.clicked = () => {
        panelLerpable.lerpBySpeed(500, 200, 100);
    };
    gameCanvas.addElement(dialoguePanel);

    dialogueBox.setParent(dialoguePanel);
    dialogueOk.setParent(dialoguePanel);
}