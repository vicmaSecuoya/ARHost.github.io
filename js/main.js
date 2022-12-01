<script>

    var lastUpdate = 0;
    var deltaTime = 0;
    var speed = 3;
    // need to run javascript code after a-scene entities and components are loaded
    AFRAME.registerComponent('mainscene',
    {

        init: function () {
        this.component = document.getElementById("camera").components["extended-wasd-controls"];
    this.joystick1 = new Joystick("stick1", 64, 8);
            },


    tick: function (time, deltaTime) {
        //console.log(this.joystick1.value)
        //console.log(this.component.movePercent)
        //this.component.movePercent.x = this.joystick1.value.x;
        //this.component.movePercent.z = -this.joystick1.value.y;
        //this.component.rotatePercent.x = -this.joystick2.value.y;
        //this.component.rotatePercent.y = -this.joystick2.value.x;

        moveCharacter(speed * deltaTime * 0.001, this.joystick1.value.x, this.joystick1.value.y);
            }
        });

    AFRAME.registerComponent('interactable', {
        schema: {
        color: { default: 'true' }
        },

    init: function () {
            var data = this.data;
    var el = this.el;  // <a-box>
        console.log("interactable!");

        //Look in cursor.js from aframe-gui for more info. This is called after fuse time.
        el.addEventListener('click', function () {
            console.log("Click");
            });

        el.addEventListener('mouseenter', function () {
            console.log("Entering");
            });

        el.addEventListener('mouseleave', function () {
            console.log("Leaving");
        });
        }
    });
        function playAnim() {
            document.getElementById("hiro").getElementById("Juan").setAttribute("animation-mixer", "clip: AnimacionCutre")
        }

        function moveCharacter(distance, directionX, directionY) {
        var scene = document.getElementById("hiro")
        var children = scene.children

        if (scene.children.length > 0) {

            var juan = scene.children[0];
        juan.setAttribute("animation-mixer", "clip: AnimacionCutre");
        juan.object3D.position.x += directionX * distance;
        juan.object3D.position.z += directionY * distance;
        }

    }








        <script type="module">
            import createModel from './js/modelCreator.js';

            createModel(document, "Juan", "color: yellow", "0 0 0", "0 0 0", "0.15 0.15 0.15", "./assets/gltf/character.gltf")

            createModel(document, "house", "color: yellow", "1 0 1", "0 90 0", "0.35 0.5 0.35", "./assets/gltf/house.gltf")
            createModel(document, "house", "color: yellow", "4 0 1", "0 15 0", "0.5 0.5 0.5", "./assets/gltf/house.gltf")
            createModel(document, "house", "color: yellow", "7 0 2.5", "0 35 0", "0.25 0.5 0.25", "./assets/gltf/house.gltf");

        </script>
</script>