AFRAME.registerComponent('building', {

    init: function () {
        this.el.setAttribute("scale", "0.1 0.1 0.1")

        console.log("Create Building");

        this.el.setAttribute("modelrenderer", "../assets/gltf/house.gltf");
        this.el.setAttribute("collider", "");

        this.model = this.el.components.modelrenderer;
        this.collider = this.el.components.collider;
    },
});
