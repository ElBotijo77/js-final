// Importamos las funciones especificas de cada archivo para unificarlo en el main
import {
    insertarIcono,
    renderizarPregunta,
    mostrarResultadoRespuesta,
    actualizarPuntuacion,
    actualizarTiempoRestante
} from "./ui.js";

import parsearPreguntasJSON from "./parseJSON.js";
import arrayAleatorio from "./questions.js";
import AudioManager from "./AudioManager.js";


// ----------------------------------------------------------------------
// --- Variables globales para el estado del juego 
// ------------------------------------------------------------------------------

const NUMERO_PREGUNTAS = 380; 
let indicesArray = arrayAleatorio(NUMERO_PREGUNTAS);
let preguntas = [];
let indicePregunta = 0;
let puntuacion = 0;
let preguntaRespondida = false;
let temporizadorId = null;
let respuestaCorrectaActual = "";
let botonesRespuesta = [];


// ----------------------------------------------------------------------
// --- Funciones de renderizado y lógica de negocio para el juego
// ----------------------------------------------------------------------

function detenerTemporizador() {
    if (temporizadorId !== null) {
        clearInterval(temporizadorId);
        temporizadorId = null;
    }
}

function iniciarTemporizadorPregunta() {
    let tiempoRestante = 30;
    actualizarTiempoRestante(tiempoRestante);
    detenerTemporizador();

    temporizadorId = setInterval(() => {
        tiempoRestante -= 1;
        actualizarTiempoRestante(tiempoRestante);

        if (tiempoRestante <= 0) {
            detenerTemporizador();
            if (preguntaRespondida) return;
            preguntaRespondida = true;
            avanzarPregunta();
        }
    }, 1000);
}

function pintarPreguntaActual() {
    if (indicesArray.length === 0) indicesArray = arrayAleatorio(NUMERO_PREGUNTAS); // Corregido typo (indecesArray)

    indicePregunta = indicesArray.pop();
    const preguntaActual = preguntas[indicePregunta];

    insertarIcono(preguntaActual.categoria);
    respuestaCorrectaActual = renderizarPregunta(preguntaActual);
    preguntaRespondida = false;
    iniciarTemporizadorPregunta();
}

function avanzarPregunta() {
    pintarPreguntaActual();
}

// --- Añadimos todos los eventos en una misma funcion para su limpieza y mantenimiento, evitando mezclar la logica de negocio con la de eventos
function configurarEventos() {
    botonesRespuesta = document.querySelectorAll(".boton-respuesta");
    
    botonesRespuesta.forEach((boton) => {
        boton.addEventListener("click", () => {
            if (preguntaRespondida) return;

            const preguntaActual = preguntas[indicePregunta];
            const respuestaSeleccionada = boton.textContent?.trim() || "";
            const acierto = respuestaSeleccionada === preguntaActual.correcta;
            detenerTemporizador();

            // Añadimos la lógica de puntuación y efectos de sonido 
            if (acierto) {
                puntuacion += 1;
                actualizarPuntuacion(puntuacion);
                audioManager.playEffect(audioManager.correct);
            } else {
                audioManager.playEffect(audioManager.wrong);
            }

            mostrarResultadoRespuesta(
                botonesRespuesta,
                respuestaSeleccionada,
                preguntaActual.correcta
            );
            preguntaRespondida = true;

            setTimeout(() => {
                avanzarPregunta();
            }, 900);
        });
    });

    // Evento del botón reiniciar integrado limpiamente con el estado compartido
    document.addEventListener("click", (event) => {
        if (event.target.matches(".reset")) {
            detenerTemporizador();
            puntuacion = 0;
            actualizarPuntuacion(puntuacion);
            pintarPreguntaActual();
        }
    });

    const botonMusica = document.getElementById("toggle-music");
    if (botonMusica) {
        const toggleMusic = () => {
            audioManager.toggleMusic();
            audioManager.updateButton(botonMusica);
        };

        botonMusica.addEventListener("click", toggleMusic);
        botonMusica.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleMusic();
            }
        });
        audioManager.updateButton(botonMusica);
    }
}


// ----------------------------------------------------------------------
// --- MAIN DE JS 
// ----------------------------------------------------------------------

async function obtenerPreguntas() {
    try {
        preguntas = await parsearPreguntasJSON();

        if (!Array.isArray(preguntas) || preguntas.length === 0) return;

        configurarEventos();
        actualizarPuntuacion(puntuacion);
        pintarPreguntaActual();
        
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Inicializar el juego
obtenerPreguntas();


// ----------------------------------------------------------------------
// --- Boton reinicio de partida
// ----------------------------------------------------------------------

const botonReiniciar = document.querySelector(".reset");
if (botonReiniciar) {
    botonReiniciar.addEventListener("click", () => {
        puntuacion = 0; 
        actualizarPuntuacion(puntuacion); 
        pintarPreguntaActual() 
    });
}


// ----------------------------------------------------------------------
// --- Logica para manejar el audio
// ----------------------------------------------------------------------

const audioManager = new AudioManager();
audioManager.addHoverToClass("boton-respuesta");

// Permite seleccionar el botón activo del menú superior
const enlacesHeader = document.querySelectorAll(".header-link");

enlacesHeader.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
        evento.preventDefault();

        enlacesHeader.forEach((item) => item.classList.remove("activo"));
        enlace.classList.add("activo");
    });
});