const markers = Array.from(document.getElementsByTagName("a-marker"));

function enableMarker(markerId, disableOthers = false) {
    if (disableOthers) {
        setAll(false);
    }

    var marker = document.getElementById(markerId);

    addFoundCallback("hiro", function (enabled) {

    });

    marker.components.markerlevel.enable();
}

function addFoundCallback(markerlevelId, callback) {
    markers.forEach(marker => {
        if (marker.id == markerlevelId) {
            marker.components.registerevents.foundCallback = callback;
        }
    });
}

function setAll(enable) {
    markers.forEach(element => {
        if (enable)
            element.components.markerlevel.enable();
        else
            element.components.markerlevel.disable();
    });
}

var markerIds = {
    characterSelection: "hiro",
    firstLevel: "courage"
}

const gameUi = document.getElementById("gameUi").components.gameUi;
window.gameCanvas.displayMenu();



enableMarker(markerIds.characterSelection);