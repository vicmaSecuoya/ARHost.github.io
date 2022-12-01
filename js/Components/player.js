import { MeshRenderer } from "./meshRenderer.js"
import { Collider } from "./collider.js"

export class Player {
    constructor(parentId, name) {
        this.name = name;
        this.entity = document.createElement("a-entity")
        this.parent = document.getElementById(parentId);
        this.parent.append(this.entity);
        this.entity.setAttribute("scale", "0.1 0.1 0.1")
        this.entity.position = "0 0 0"


        this.meshRenderer = new MeshRenderer(this.entity, "./assets/gltf/character.gltf");
        this.collider = new Collider(this.entity, "player");
        console.log("Span player");
    }

    move(distance, directionX, directionY) {

        juan.setAttribute("animation-mixer", "clip: AnimacionCutre");
        this.object3D.position.x += directionX * distance;
        this.object3D.position.z += directionY * distance;

    }
}
