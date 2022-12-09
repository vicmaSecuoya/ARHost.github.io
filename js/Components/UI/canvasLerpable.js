export class CanvasLerpable {

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
        var worldCenter = this.canvasElement.getPosition();

        var distance = Math.sqrt(Math.pow(this.targetX - worldCenter[0], 2) + Math.pow(this.targetY - worldCenter[1], 2));
        var time = distance / speed;

        this.lerpByTime(worldTargetX, worldTargetY, time);
    }

    lerpByTime(worldTargetX, worldTargetY, time) {
        this.targetX = worldTargetX;
        this.targetY = worldTargetY;

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
        }

        var t = this.elapsedTime / this.targetTime;
        var x = (1 - t) * this.startingX + t * this.targetX;
        var y = (1 - t) * this.startingY + t * this.targetY;

        this.canvasElement.moveTo(x, y);
    }

}
