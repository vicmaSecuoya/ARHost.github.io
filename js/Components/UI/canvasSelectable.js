class canvasSelectable {

    constructor(canvasElement, context) {
        this.canvasElement = canvasElement;
        this.context = context;
        context.selectables.push(this);
    }


    notifyClick(down, x, y) {
        console.log("Clicked by my paarent! " + down);

        var worldPosition = this.canvasElement.getPosition();

        // AABB
        if (worldPosition.x >= x && worldPosition.y <= y) {
            if ((worldPosition.y + this.canvasElement.height <= y) && (worldPosition.x + this.canvasElement.width >= worldPosition.y)) {
                clicked();
                debugger        
            }
        }
        debugger
    }

    clicked() {

    }

    notifyMove(x, y) {

    }
}