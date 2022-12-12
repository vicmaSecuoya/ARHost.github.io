AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;


        marker.addEventListener('markerFound', function () {
            var enabled = marker.components.markerlevel.enabled;

            if (this.components.registerevents.foundCallback != undefined) {
                this.components.registerevents.foundCallback(enabled);
            }

        });

        marker.addEventListener('markerLost', function () {

        });
    }
});

AFRAME.registerComponent('markerlevel', {
    schema: {
        enabled: { default: 'true' }
    },

    init: function () {

        if (this.data.enabled) {
            this.enable();
        } else {
            this.disable();
        }
    },

    enable: function () {
        this.enabled = true;
        this.changeVisibility(true);
        console.log("Enable!");
    },

    disable: function () {
        this.enabled = false;
        this.changeVisibility(false);
    },

    changeVisibility(visible) {
        var children = Array.from(this.el.children);

        children.forEach(element => {
            element.setAttribute("visible", visible);
        });
    }

});
