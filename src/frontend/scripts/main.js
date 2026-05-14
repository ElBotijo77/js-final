// Importamos las funciones especificas de cada archivo para unificarlo en el main
import {
    insertarIcono,
    renderizarPregunta,
    mostrarResultadoRespuesta,
    actualizarPuntuacion,
    actualizarTiempoRestante
} from "./ui.js";

import parsearPreguntasJSON from "./parseJSON.js";
import obtenerIndiceAleatorio from "./questions.js";
import AudioManager from "./AudioManager.js";


async function obtenerPreguntas() {
    try {
        const preguntas = await parsearPreguntasJSON();

        if (!Array.isArray(preguntas) || preguntas.length === 0) return;

        let indicePregunta = 0;
        let puntuacion = 0;
        let preguntaRespondida = false;
        let temporizadorId = null;
        const botonesRespuesta = document.querySelectorAll(".boton-respuesta");

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
            indicePregunta = obtenerIndiceAleatorio();
            const preguntaActual = preguntas[indicePregunta];

            insertarIcono(preguntaActual.categoria);
            renderizarPregunta(preguntaActual);
            preguntaRespondida = false;
            iniciarTemporizadorPregunta();
        }

        function avanzarPregunta() {
            pintarPreguntaActual();
        }

        botonesRespuesta.forEach((boton) => {
            boton.addEventListener("click", () => {
                if (preguntaRespondida) return;

                const preguntaActual = preguntas[indicePregunta];
                const respuestaSeleccionada = boton.textContent?.trim() || "";
                const acierto = respuestaSeleccionada === preguntaActual.correcta;
                detenerTemporizador();

                // Ejecutara el sonido correspondiente segun acierte o no el usuario
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

        const botonJugarAhora = document.querySelector(".boton-play-now");
        if (botonJugarAhora) {
            botonJugarAhora.addEventListener("click", () => {
                detenerTemporizador();
                avanzarPregunta();
            });
        }

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

        actualizarPuntuacion(puntuacion);
        pintarPreguntaActual();
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

obtenerPreguntas();


// Logica de negocio para manejar el audio de la web

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