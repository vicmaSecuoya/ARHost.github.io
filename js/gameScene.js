import Player from "./GameObjects/player.js"
import Joystick from "./Functions/Input/joystick.js"

export default function generateScene() {

}

console.log("Creating scene...");

var joystick1 = new Joystick("mainscene", "stick1", 64, 8);

var player = new Player("hiro", "juan");
