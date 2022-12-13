export class AudioSource {
    constructor(src, start = false, loop = false) {

        this.audio = new Audio(src);

        if (start) {
            this.audio.play();
        }

        this.audio.addEventListener('ended', function () {
            if (loop) {
                this.play();
            }
        });
    }


    setVolume(volume) {
        this.audio.volume = volume;
    }

    stop() {
        this.audio.stop();
    }

    play() {
        this.audio.play();
    }
}