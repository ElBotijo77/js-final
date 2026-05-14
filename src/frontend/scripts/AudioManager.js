class AudioManager {
  constructor() {
    this.click = new Audio("./assets/audio/sounds/click.mp3");
    this.check = new Audio("./assets/audio/sounds/check.mp3");
    this.correct = new Audio("./assets/audio/sounds/correct.mp3");
    this.hover = new Audio("./assets/audio/sounds/hover.mp3");
    this.music = new Audio("./assets/audio/music/music.mp3");

    this.music.loop = true;
    this.music.volume = 0.5;

    this.click.load();
    this.check.load();
    this.correct.load();
    this.hover.load();
    this.music.load();

    this.musicEnabled = localStorage.getItem("musicEnabled") !== "false";

    if (this.musicEnabled) {
      this.music.play().catch(() => {
        // El navegador puede bloquear la reproducción automática hasta que el usuario interactúe.
      });
    }
  }

  playEffect(sound) {
    const copySound = sound.cloneNode();
    copySound.volume = 0.5;
    copySound.play();
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem("musicEnabled", this.musicEnabled);

    if (this.musicEnabled) {
      this.music.play().catch(() => {
        // El navegador puede bloquear la reproducción automática hasta que el usuario interactúe.
      });
    } else {
      this.music.pause();
    }
  }

  updateButton(button) {
    if (!button) return;

    button.innerHTML = this.musicEnabled
      ? '<span class="material-symbols-outlined">music_note</span>'
      : '<span class="material-symbols-outlined">music_off</span>';

    button.classList.toggle("activo", this.musicEnabled);
    button.setAttribute("aria-pressed", String(this.musicEnabled));
  }
}

export default AudioManager;
