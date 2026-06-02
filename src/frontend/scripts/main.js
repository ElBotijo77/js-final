// Importamos las funciones especificas de cada archivo para unificarlo en el main
import {
    insertarIcono,
    renderizarPregunta,
    mostrarResultadoRespuesta,
    actualizarPuntuacion,
    actualizarTiempoRestante,
    actualizarVidas
} from "./ui.js";

import parsearPreguntasJSON from "./parseJSON.js";
import arrayAleatorio from "./questions.js";
import AudioManager from "./AudioManager.js";


// ----------------------------------------------------------------------
// --- Variables globales para el estado del juego 
// ------------------------------------------------------------------------------

const NUMERO_PREGUNTAS = 380; 
const botonReiniciar = document.querySelector(".reset");
let indicesArray = arrayAleatorio(NUMERO_PREGUNTAS);
let preguntas = [];
let indicePregunta = 0;
let puntuacion = 0;
let vidas = 3;
let preguntaRespondida = false;
let temporizadorId = null;
let respuestaCorrectaActual = "";
let botonesRespuesta = [];
let mostrarRankingEnCuadro = null;
let partidaTerminada = false;
let viendoRanking = false;


// Definimos las rutas de las APIS para que se carguen correctamente en Cloudflare
const API_URL = "https://js-final.onrender.com";

// 1. Ruta para obtener y mostrar el Top 5
function obtenerRanking() {
    fetch(`${API_URL}/api/ranking`)
        .then(res => res.json())
        .then(data => console.log("Ranking:", data)); 
}

// 2. Ruta para guardar la puntuación de un jugador
function enviarPuntuacion(nombre, puntos) {
    fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: nombre, puntuacion: puntos })
    })
    .then(res => res.json())
    .then(data => console.log(data.mensaje));
}


// ----------------------------------------------------------------------
// --- Modal de inicio de sesion
// ------------------------------------------------------------------------------

function configurarModalLogin() {
    // Si la libreria esta cargada, dejamos preparado el modal para abrir/cerrar.
    if (typeof window.MicroModal !== "undefined") {
        window.MicroModal.init({
            onShow: modal => console.log(`${modal.id} is shown`),
            onClose: modal => console.log(`${modal.id} is hidden`),
            disableScroll: true,
            disableFocus: false,
            awaitOpenAnimation: true,
            awaitCloseAnimation: true
        });
    } else {
        console.error("MicroModal no se ha cargado correctamente.");
    }

    const formulario = document.querySelector(".modal-formulario");

    if (!formulario) return;

    // Controlamos el envio para que no recargue la pagina.
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Cogemos los datos que ha escrito el usuario en el modal.
        const usuario = document.getElementById("usuario").value;
        const condiciones = document.getElementById("condiciones").checked;
        
        // Con esto podemos trabajar tanto en local como en la nube haciendo que el servidor funcione
        const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://js-final.onrender.com";

        // Este es el JSON que se manda al backend.
        const datos = {
            usuario: usuario,
            puntuacion: typeof puntuacion !== "undefined" ? puntuacion : 0,
        };

        try {
            // Enviamos los datos al servidor Flask.
            const respuesta = await fetch(`${API_URL}/api/usuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            if (respuesta.ok) {
                // Si todo va bien, cerramos el modal y limpiamos el formulario.
                window.MicroModal.close("modal-1");
                formulario.reset();
                if (typeof mostrarRankingEnCuadro === "function") {
                    await mostrarRankingEnCuadro();
                }
            } else {
                alert("Hubo un error en el servidor.");
            }
        } catch (error) {
            console.error("Error de conexion:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}


// ----------------------------------------------------------------------
// --- Ranking global
// ------------------------------------------------------------------------------

function configurarRankingGlobal() {
    const botonRanking = document.querySelector(".ranking-menu");
    const botonVolver = document.querySelector(".ranking-volver");
    const panelRanking = document.querySelector(".ranking-panel");
    const contenedorTrivial = document.querySelector(".contenedor-trivial");
    const listaRanking = document.querySelector(".ranking-lista");
    const mensajeRanking = document.querySelector(".ranking-mensaje");

    if (!botonRanking || !botonVolver || !panelRanking || !contenedorTrivial || !listaRanking || !mensajeRanking) return;

    const mostrarJuego = () => {
        // Cambiamos el estado de la variable e iniciamos el temporizados nuevamente
        viendoRanking = false;

        panelRanking.hidden = true;
        contenedorTrivial.classList.remove("modo-ranking");

        iniciarTemporizadorPregunta();
    };

    const pintarRanking = (ranking) => {
        listaRanking.innerHTML = "";

        if (!ranking.length) {
            mensajeRanking.textContent = "Todavia no hay puntuaciones guardadas.";
            return;
        }

        mensajeRanking.textContent = "";

        ranking.forEach((jugador, index) => {
            const item = document.createElement("li");
            item.className = "ranking-item";
            item.innerHTML = `
                <span class="ranking-posicion">#${index + 1}</span>
                <span class="ranking-usuario">${jugador.nombre}</span>
                <strong class="ranking-puntuacion">${jugador.puntuacion} pts</strong>
            `;
            listaRanking.appendChild(item);
        });
    };

    const cargarYMostrarRanking = async () => {
        // Si estamos viendo el ranking, el temporizador se detiene 
        detenerTemporizador();
        viendoRanking = true;

        contenedorTrivial.classList.add("modo-ranking");
        panelRanking.hidden = false;
        listaRanking.innerHTML = "";
        mensajeRanking.textContent = "Cargando ranking...";

        // URL dinamica para trabajar en local mientras en la nube sigue funcionando
        const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "https://js-final.onrender.com";

        try {
            const respuesta = await fetch(`${API_URL}/api/ranking?limit=5`);

            if (!respuesta.ok) {
                mensajeRanking.textContent = "No se pudo cargar el ranking.";
                return;
            }

            const datos = await respuesta.json();
            pintarRanking(datos || []);
        } catch (error) {
            console.error("Error cargando ranking:", error);
            mensajeRanking.textContent = "No se pudo conectar con el servidor del ranking.";
        }
    };

    // Logica de negocio para reiniciar partida dentro de la pestaña Ranking
    if (botonReiniciar) {
    botonReiniciar.addEventListener("click", () => {
        reiniciarPartida();

        panelRanking.hidden = true;
        contenedorTrivial.classList.remove("modo-ranking");
    });
}

    botonRanking.addEventListener("click", cargarYMostrarRanking);

    botonVolver.addEventListener("click", mostrarJuego);
    mostrarRankingEnCuadro = cargarYMostrarRanking;
}


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
            vidas -= 1;
            actualizarVidas(vidas);

            if (vidas <= 0) {
                mostrarGameOver();
                return;
            }

            setTimeout(() => {
                avanzarPregunta();
            }, 900);
        }
    }, 1000);
}

function pintarPreguntaActual() {
    if (indicesArray.length === 0) indicesArray = arrayAleatorio(NUMERO_PREGUNTAS); // Corregido typo (indecesArray)
    const panelRanking = document.querySelector(".ranking-panel");
    if (panelRanking) {
        panelRanking.hidden = true;
    }

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

function mostrarGameOver() {
    if (partidaTerminada) return;
    partidaTerminada = true;

    // Ocultar la categoría (fila-1)
    const fila1 = document.querySelector(".fila-1");
    if (fila1) {
        fila1.style.display = "none";
    }
    
    // Ocultar las respuestas (fila-3)
    const fila3 = document.querySelector(".fila-3");
    if (fila3) {
        fila3.style.display = "none";
    }

    // Resaltar el mensaje de Game Over
    const fila2 = document.querySelector(".fila-2");
    const h2 = fila2?.querySelector("h2");
    if (fila2) {
        fila2.classList.add("game-over-screen");
    }
    if (h2) {
        h2.textContent = "¡GAME OVER! 💀";
        h2.classList.add("game-over-message");
    }

    if (typeof window.MicroModal !== "undefined") {
        window.MicroModal.show("modal-1");
    }
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
                vidas -= 1;
                actualizarVidas(vidas);
                audioManager.playEffect(audioManager.wrong);
            }

            mostrarResultadoRespuesta(
                botonesRespuesta,
                respuestaSeleccionada,
                preguntaActual.correcta
            );
            preguntaRespondida = true;

            // Verificar si se acabaron las vidas DESPUÉS de mostrar el resultado
            if (vidas <= 0) {
                setTimeout(() => {
                    mostrarGameOver();
                }, 900);
            } else {
                setTimeout(() => {
                    avanzarPregunta();
                }, 900);
            }
        });
    });

    // Evento del botón reiniciar integrado limpiamente con el estado compartido
    document.addEventListener("click", (event) => {
        if (event.target.matches(".reset")) {
            detenerTemporizador();
            partidaTerminada = false;
            puntuacion = 0;
            vidas = 3;
            actualizarPuntuacion(puntuacion);
            actualizarVidas(vidas);
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
        actualizarVidas(vidas);
        pintarPreguntaActual();
        
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Inicializar el juego
configurarModalLogin();
configurarRankingGlobal();
obtenerPreguntas();


// ----------------------------------------------------------------------
// --- Boton reinicio de partida
// ----------------------------------------------------------------------


function reiniciarPartida() {
    partidaTerminada = false;
    puntuacion = 0;
    vidas = 3;

    actualizarPuntuacion(puntuacion);
    actualizarVidas(vidas);
    pintarPreguntaActual();
}

if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarPartida);
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
