AFRAME.registerComponent('modelrenderer', {
    schema: {
        modelPath: { type: 'string', default: '' }
    },

    init: function () {
        var data = this.data;
        this.el.setAttribute("gltf-model", data);
        console.log("Loading model " + data);
    },

    tick: function () {
    }

});