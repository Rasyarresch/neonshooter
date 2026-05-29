export class AudioManager {
    constructor() {
        this.sounds = {
            shoot: new Audio(),
            explosion: new Audio(),
            levelUp: new Audio(),
            click: new Audio()
        };
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(() => {});
        }
    }
}
