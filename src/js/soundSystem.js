var context;
window.addEventListener('load', init, false);
function init() {
    try {
        context = new AudioContext();
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}