export class CanvasElement {
    constructor(x, y, context, width = 0, height = 0) {
        this.context = context;

        this.width = width;
        this.height = height;
        this.localX = 0;
        this.localY = 0;
        this.moveTo(x, y);

        this.parent = null;
        this.children = []
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

        if (parent == this) return;

        //Remove child from parent
        if (this.parent != undefined) {
            this.parent.children = this.parent.children.filter(child => child != this);
        }

        this.parent = parent;
        this.parent.children.push(this);

        var worldPosition = this.getPosition();
        var parentWorldPosition = parent.getPosition();

        this.localX = worldPosition[0] - parentWorldPosition[0];
        this.localY = worldPosition[1] - parentWorldPosition[1];
    }

    moveTo(x, y, local = false) {

        if (local == false) {
            if (this.parent != undefined) {
                var parentWorld = this.parent.getPosition();

                x = x - parentWorld[0];
                y = y - parentWorld[1];
            }
        }

        this.localX = x;
        this.localY = y;
    }

    getCenterPosition() {
        var worldPosition = this.getPosition();
        worldPosition[0] += 0.5 * this.width;
        worldPosition[1] += 0.5 * this.height;

        return worldPosition;
    }

    renderSelf(worldX, worldY) {
        //Overwrite this function if inheriting
    }

    render(offsetX, offsetY) {

        offsetX += this.localX;
        offsetY += this.localY;

        this.renderSelf(offsetX, offsetY);

        this.children.forEach(child => {
            child.render(offsetX, offsetY);
        });
    }
}
