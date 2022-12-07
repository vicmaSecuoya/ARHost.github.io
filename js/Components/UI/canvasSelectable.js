export class CanvasSelectable {

    constructor(canvasElement, gameCanvas) {
        this.canvasElement = canvasElement;
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
