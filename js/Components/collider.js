AFRAME.registerComponent('cursorinteractable', {
    schema: {
        color: { default: 'true' }
    },

    init: function () {
        parent.setAttribute("collision-filter", "group: " + group);
    },
    tick: function () {

    }
});