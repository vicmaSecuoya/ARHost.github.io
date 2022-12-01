AFRAME.registerComponent('mobilebody', {
    init: function () {
        console.log("Created mobile body");
    },

    move: function (x, y, z) {
        this.el.object3D.position.x += x;
        this.el.object3D.position.y += y;
        this.el.object3D.position.z += z;
    }

});