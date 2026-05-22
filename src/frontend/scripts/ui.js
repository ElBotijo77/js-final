// Mostrará la categoria principal, cogiendolo del JSON e incrutará 
// el icono correspondiente a la categoria dada
import arrayAleatorio from "./questions.js";

export function insertarIcono(categoria) {
    const img = document.getElementById("icono-categoria");
    const texto = document.getElementById("texto-categoria");

    if (!img || !categoria) return;

    const basePath = "./assets/icons/";

    const categoriaFormateada = categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const iconos = {
        "Ciencia": "ciencia.png",
        "Astronomía": "astronomia.png",
        "Gastronomía": "gastronomia.png",
        "Tecnología": "tecnologia.png",
        "Videojuegos": "videojuegos.png",
        "Automovilismo": "automovilismo.png",
        "Geografía": "geografia.png",
        "Historia": "historia.png",
        "Meteorología": "meteorologia.png",
        "Cine": "cine.png",
        "Música": "musica.png"
    };

    const archivo = iconos[categoriaFormateada] || `${categoriaFormateada}.png`;

    img.src = basePath + archivo;
    img.alt = categoria;

    texto.textContent = categoria;
}

export function renderizarPregunta(preguntaActual) {
    const tituloPregunta = document.querySelector(".fila-2 h2");
    const botonesRespuesta = document.querySelectorAll(".boton-respuesta");

    if (!tituloPregunta || botonesRespuesta.length === 0 || !preguntaActual) return;

    // Mostrar nuevamente la categoría y respuestas (por si estaban ocultas)
    const fila1 = document.querySelector(".fila-1");
    if (fila1) {
        fila1.style.display = "flex";
    }
    
    const fila3 = document.querySelector(".fila-3");
    if (fila3) {
        fila3.style.display = "flex";
    }
    
    const fila4 = document.querySelector(".fila-4");
    if (fila4) {
        fila4.style.display = "flex";
    }
    const fila5 = document.querySelector(".fila-5");
    if (fila5) {
        fila5.style.display = "flex";
    }

    // Resetear estilos del título
    tituloPregunta.textContent = preguntaActual.pregunta;
    tituloPregunta.classList.remove("game-over-message");
    tituloPregunta.style.color = "";
    tituloPregunta.style.fontSize = "";
    tituloPregunta.style.fontWeight = "";
    tituloPregunta.style.textShadow = "";
    tituloPregunta.style.letterSpacing = "";

    const fila2 = document.querySelector(".fila-2");
    if (fila2) {
        fila2.classList.remove("game-over-screen");
    }

    // La respuesta correcta es siempre la primera del archivo JSON
    const respuestaCorrecta = preguntaActual.opciones[0];

    //Ahora el barajado de las respuestas para que sea aleatorio y mapeamos las respuestas
    const indicesMeclados = arrayAleatorio(4);
    const opcionesBarajadas = indicesMeclados.map(i => preguntaActual.opciones[i]);

    botonesRespuesta.forEach((boton, indice) => {
        boton.textContent = opcionesBarajadas[indice] || "";
        boton.disabled = false;
        boton.classList.remove("respuesta-correcta", "respuesta-incorrecta");
    });

    return respuestaCorrecta;
}

export function mostrarResultadoRespuesta(botonesRespuesta, respuestaSeleccionada, respuestaCorrecta) {
    botonesRespuesta.forEach((boton) => {
        boton.disabled = true;
        const texto = boton.textContent?.trim() || "";

        if (texto === respuestaCorrecta) {
            boton.classList.add("respuesta-correcta");
        } else if (texto === respuestaSeleccionada) {
            boton.classList.add("respuesta-incorrecta");
        }
    });
}

export function actualizarPuntuacion(puntos) {
    const marcador = document.querySelector(".fila-4 div:first-child p");
    if (!marcador) return;
    marcador.textContent = `Puntuacion actual: ${puntos}`;
}

export function actualizarTiempoRestante(segundos) {
    const tiempo = document.querySelector(".fila-4 div:last-child p");
    if (!tiempo) return;
    tiempo.textContent = `Tiempo restante: ${segundos}s`;
    tiempo.classList.toggle("tiempo-alerta", segundos <= 5 && segundos > 0);
}

export function actualizarVidas(vidasRestantes) {
    const vidas = document.querySelectorAll(".vida");
    if (vidas.length === 0) return;
    
    vidas.forEach((vida, indice) => {
        if (indice < vidasRestantes) {
            vida.classList.remove("perdida");
        } else {
            vida.classList.add("perdida");
        }
    });
}