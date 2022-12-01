AFRAME.registerComponent('cursorinteractable', {
    schema: {
        color: { default: 'true' }
    },

    init: function () {
        console.log("Created cursorInteractable!");

        //Look in cursor.js from aframe-gui for more info. This is called after fuse time.
        el.addEventListener('click', function () {
            console.log("Click");
        });

        el.addEventListener('mouseenter', function () {
            console.log("Entering");
        });

        el.addEventListener('mouseleave', function () {
            console.log("Entering");
        });
    },
    tick: function () {

    }
});