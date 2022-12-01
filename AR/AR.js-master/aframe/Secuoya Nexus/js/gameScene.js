
console.log("Executing")

AFRAME.registerComponent('gamescene',
    {
        schema: {},
        'init': function () {
            console.log("Fuck u VIcente");
            console.debug("Created Scene!");
            var player = new Player("hiro", "juan");


        },
        tick: function () {

        }
    });
console.log("Executing")