// Aqui ira toda la logica relacionada con las preguntas, tanto como el generado en aleatorio
// evitando que salgan preguntas repetidas como la comprobación de si son correctas


// Declaramos un array donde se guardaran los indices de las preguntas que ya han salido y
// la funcion que devuelve un numero aleatorio sin repetir


let indices = [];

//Baraja las preguntas con el algoritmo de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Genera un array con valores de 0,1,2...
function generaArray() {
    indices = [];
    for (let i = 0; i < 40; i++) {
        indices.push(i);
    }
    shuffleArray(indices);
}


// Devuelve el indice 
function obtenerIndiceAleatorio() {
    // Cuando se hayan generado 40 indices, se reinicia el contador y el array
    if (indices.length === 0) {
        generaArray();
    }
    return indices.pop();
}




//===========================================================
//===========================================================

// EN CONSTRUCCION. Ya que ahora tenemos el JSON parseado en preguntasObtenidas, llamando al metodo
// de arriba de generaIndiceAleatorio podemos sacar una pregunta lista para usar y plasmarla en el HTML
// Más abajo haremos la comprobación de si la respuesta obtenida es la correcta, haciendo que cargue
// otra pregunta aleatoria tras pulsar una respuesta. En el main recogerá los metodos necesarios para
// ejecutar esta logica. 

// Comprobacion de respuesta correcta

import { obtenerPreguntas } from "./parseJSON.js";

// Array de objetos
let preguntasObtenidas = await obtenerPreguntas();



function comprobarRespuesta(pregunta, respuesta) {
    return pregunta.correct_answer === respuesta;
}
