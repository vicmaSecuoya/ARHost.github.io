AFRAME.registerComponent('player', {
    schema: {
        color: { default: 'true' }
    },

    init: function () {
        this.el.setAttribute("scale", "0.1 0.1 0.1")
        this.speed = 3;

        console.log("Create Player");

        this.el.setAttribute("modelrenderer", "../assets/gltf/character.gltf");
        this.el.setAttribute("mobilebody", "");
        this.el.setAttribute("collider", "");

        this.mobile = this.el.components.mobilebody;
        this.model = this.el.components.modelrenderer;
        this.collider = this.el.components.collider;

        this.joystick = document.getElementById("joystick").components.joystick;
    },
    
    tick: function (time, timeDelta) {
        var deltaPos = timeDelta * 0.001 * this.speed;
        this.mobile.move(this.joystick.joystick.value.x * deltaPos, 0, this.joystick.joystick.value.y * deltaPos);
    }

});
