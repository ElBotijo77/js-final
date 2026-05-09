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


// Permite seleccionar el botón activo del menú superior
const enlacesHeader = document.querySelectorAll(".header-link");

enlacesHeader.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
        evento.preventDefault();

        enlacesHeader.forEach((item) => item.classList.remove("activo"));
        enlace.classList.add("activo");
    });
});


// En indice pregunta, modificar por el array obtenido por el metodo Fisher-Yates, asi mostrara
// siempre preguntas aleatorias.

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
            const indice = obtenerIndiceAleatorio();
            const preguntaActual = preguntas[indice];

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

                if (acierto) {
                    puntuacion += 1;
                    actualizarPuntuacion(puntuacion);
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

        actualizarPuntuacion(puntuacion);
        pintarPreguntaActual();
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

obtenerPreguntas();
