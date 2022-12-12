function enableMarker(markerId) {

    var markers = Array.from(document.getElementsByTagName("a-marker"));

    markers.forEach(element => {
        element.components.markerlevel.disable();
    });

    var marker = document.getElementById(markerId);

    marker.components.registerevents.foundCallback = function (enabled) {
        console.log("Caquita " + enabled);
    };
    marker.components.markerlevel.enable();
}

var markerIds = {
    characterSelection: "hiro",
    firstLevel: "courage"

}

const gameUi = document.getElementById("gameUi").components.gameUi;
window.gameCanvas.displayMenu();



enableMarker(markerIds.characterSelection);