class AudioManager {
  constructor() {

    // Importamos la musisca de fondo desde el HTML para guardalo en una variable
    this.correct = new Audio("./assets/audio/sounds/correct.mp3");
    this.wrong = new Audio("./assets/audio/sounds/wrong.mp3");
    this.music = new Audio("./assets/audio/music/music.mp3");
    this.hover = new Audio("./assets/audio/sounds/hover.mp3");

    // Establecemos que se ponga en Loop, previamente modificada en Ableton para que no se note 
    // la bajada de audio final. Se establece un volumen de 0.5 para que este presente
    this.music.loop = true;
    this.music.volume = 0.5;

    // Para evitar un pequeño delay inicial, cargarmos los sonidos en la caché
    this.correct.load();
    this.wrong.load();
    this.hover.load();
    this.music.load();

    // Guardamos el estado de musica activada
    this.musicEnabled = localStorage.getItem("musicEnabled") !== "false";
  }


  // Con cloneNode evitamos cortes al pulsar varias veces segudas el mismo boton
  // Bajamos un poco el volumen de wrong, ya que no se ha masterizado
  playEffect(sound) {
    const copySound = sound.cloneNode();
    copySound.volume = 1;
    if(sound === this.wrong) copySound.volume = 0.5;
    copySound.play();
  }


  // Alterna muscia en apagado/encendido. Se guarda el estado en localStorage
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem("musicEnabled", this.musicEnabled);

    // Inicia o detiene la muscia según el estado
    if (this.musicEnabled) this.music.play()
    else this.music.pause();
    }
  

  // Creamos un metodo que ejecute el sonido Hover cuando el raton entra dentro del boton
  addHoverToClass(className, sound = this.hover) {
      const buttons = document.querySelectorAll(`.${className}`);

      console.log("Botones encontrados:", buttons.length);

      buttons.forEach(button => {
          button.addEventListener("mouseenter", () => {
              this.playEffect(sound);
          });
      });
  }

  // Actualizar la interfaz visual del botón de música para que coincida con el estado actual del juego
  // tachandolo con una raya la nota muscial(Icono)
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
