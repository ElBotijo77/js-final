// Mostrará la categoria principal, cogiendolo del JSON e incrutará 
// el icono correspondiente a la categoria dada
export function insertarIcono(categoria) {
    const img = document.getElementById("icono-categoria");
    const texto = document.getElementById("texto-categoria");

    if (!img) return;

    const basePath = "assets/icons/";

    const iconos = {
        "Ciencia": "ciencia.png",
        "Astronomia": "astronomia.png",
        "Astronomía": "astronomia.png",
        "Gastronomia": "comida.png",
        "Java": "java.png"
    };

    const archivo = iconos[categoria] || "default.png";

    img.src = basePath + archivo;
    img.alt = categoria;

    texto.textContent = categoria;
}

export function renderizarPregunta(preguntaActual) {
    const tituloPregunta = document.querySelector(".fila-2 h2");
    const botonesRespuesta = document.querySelectorAll(".boton-respuesta");

    if (!tituloPregunta || botonesRespuesta.length === 0 || !preguntaActual) return;

    tituloPregunta.textContent = preguntaActual.pregunta;

    botonesRespuesta.forEach((boton, indice) => {
        boton.textContent = preguntaActual.opciones[indice] || "";
        boton.disabled = false;
        boton.classList.remove("respuesta-correcta", "respuesta-incorrecta");
    });
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