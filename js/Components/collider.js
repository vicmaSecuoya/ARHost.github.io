export default class Collider {
    constructor(parent, group) {
        parent.setAttribute("collision-filter", "group: " + group);
    }

}
