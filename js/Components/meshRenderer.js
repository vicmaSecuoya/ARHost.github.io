export default class MeshRenderer {
    constructor(parent, modelPath) {

        this.parent = parent;
        this.modelPath = modelPath;

        parent.setAttribute("interactable", "true")
        parent.setAttribute("event-set__enter", "event: mouseeenter;");
        //event-set__leave="_event: mouseleave; color: #4CC3D9">

        parent.setAttribute("id", name)
        parent.setAttribute("material", "color: red")

        parent.setAttribute("gltf-model", modelPath);
        parent.append(this);
    }

}