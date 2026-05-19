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

    tituloPregunta.textContent = preguntaActual.pregunta;

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