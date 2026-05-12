class AudioManager {
  constructor() {

    // Importamos la musisca de fondo desde el HTML para guardalo en una variable
    this.click = new Audio("./assets/audio/sounds/click.mp3");
    this.check = new Audio("./assets/audio/sounds/check.mp3");
    this.music = new Audio("./assets/audio/music/cancionSims.mp3");

    // Establecemos que se ponga en Loop, previamente modificada en Ableton para que no se note 
    // la bajada de audio final. Se establece un volumen de 0.5 para que este presente
    this.music.loop = true;
    this.music.volume = 0.5;

    // Para evitar un pequeño delay inicial, cargarmos los sonidos en la caché
    this.click.load();
    this.check.load();
    this.music.load();

    // Guardamos el estado de musica activada
    this.musicEnabled = localStorage.getItem("musicEnabled") !== "false";
  }


  // Con cloneNode evitamos cortes al pulsar varias veces segudas el mismo boton
  playEffect(sound) {
    const copySound = sound.cloneNode();

    copySound.volume = 0.5;

    copySound.play();
  }

  // Alterna muscia en apagado/encendido. Se guarda el estado en localStorage
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;

    localStorage.setItem("musicEnabled", this.musicEnabled);

    // Inicia o detiene la muscia según el estado
    if (this.musicEnabled) this.music.play();
    else this.music.pause();
    
  }
}

const audio = new AudioManager();