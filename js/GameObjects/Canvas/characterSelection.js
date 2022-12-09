import { CanvasElement } from "../../Components/UI/canvasElement.js";
import { CanvasLerpable } from "../../Components/UI/CanvasLerpable.js";
import { CanvasSelectable } from "../../Components/UI/canvasSelectable.js"
import { CanvasImage } from "../../Components/UI/canvasImage.js"
import { CanvasText } from "../../Components/UI/canvasText.js";
import { AudioSource } from "../../Components/Sound/audioSource.js";

var paths = {
    characterOne: "/assets/images/character-one.png",
    characterTwo: "/assets/images/character-two.png",

    menuHolder: "/assets/images/menu-holder.png",
    dialogueBox: "/assets/images/dialogue-box.png",
    dialogueButton: "/assets/images/ok.png",
};

export class CharacterSelection extends CanvasElement {

    constructor(x, y, context, gameCanvas) {
        super(x, y, context);
        this.gameCanvas = gameCanvas;
        this.gameCanvas.addElement(this);

        this.context = context;

        this.hiddenX = -500;
        this.hiddenY = 540;

        this.createBox();
        this.createCharacters();
        this.createDialogueText();

        this.audio = new AudioSource("/assets/Sound/khselect.mp3");
    }


    createBox() {

        this.dialogueBox = new CanvasImage(this.hiddenX, this.hiddenY, this.context, 800, 700, paths.menuHolder);
        this.lerpable = new CanvasLerpable(this.dialogueBox, this.gameCanvas);
        this.dialogueBox.setParent(this);
    }

    createCharacters() {
        this.characterHolder = new CanvasElement(0, 150, this.context);
        this.characterHolder.setParent(this.dialogueBox);

        var characterW = 200;
        var characterH = 300;
        this.characterOne = new CanvasImage(-150, 0, this.context, characterW, characterH, paths.characterOne);
        this.characterOne.setParent(this.characterHolder);
        var canvasSelectableOne = new CanvasSelectable(this.characterOne, this.gameCanvas);

        this.characterTwo = new CanvasImage(150, 0, this.context, characterW, characterH, paths.characterTwo);
        var canvasSelectableTwo = new CanvasSelectable(this.characterTwo, this.gameCanvas);
        this.characterTwo.setParent(this.characterHolder);

        canvasSelectableOne.clicked = () => {
            this.selectCharacter("Oooone");
            this.audio.play();
            this.hide();
        };

        canvasSelectableTwo.clicked = () => {
            this.selectCharacter("Twoooo");
            this.audio.play();
            this.hide();
        };
    }

    selectCharacter(name) {
        console.log("Character selected: " + name);
    }

    createDialogueText() {
        this.dialogueText = new CanvasText(0, 0, this.context, "Choose your fighter!");
        this.dialogueText.setParent(this.dialogueBox);

        this.dialogueText.moveTo(0, -150, true);

    }

    display() {
        this.lerpable.lerpByTime(960, 540, 0.5);
        console.log("Displaying Character Selection!");
    }

    hide() {
        this.lerpable.lerpByTime(this.hiddenX, this.hiddenY, 0.5);
        console.log("Hiding Character Selection!");
    }
}