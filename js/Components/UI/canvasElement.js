export class CanvasElement {
    constructor(x, y, width, height, imagePath, context) {
        this.localX = x;
        this.localY = y;
        this.width = width;
        this.height = height;
        this.context = context;

        this.image = new Image();

        this.parent = null;
        this.children = []

        if (imagePath != "") {
            this.image.src = imagePath;
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
        
        this.context.drawImage(this.image, offsetX, offsetY, this.width, this.height);

        this.children.forEach(child => {
            child.render(offsetX, offsetY);
        });
    }
}
