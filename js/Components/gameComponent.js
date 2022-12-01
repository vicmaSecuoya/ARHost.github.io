export default class GameComponent {
    constructor(entityTag, parentId) {
        this.entity = document.createElement("a-entity")
        this.entityTag = entityTag;

        this.entity.setAttribute(entityTag);

        this.parent = document.getElementById(parentId);
        this.parent.append(this.entity);
    }
}
