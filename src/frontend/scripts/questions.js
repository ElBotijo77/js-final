// Generacion de un array con indices aleatorios mediante un algoritmo, para asi evitar
// un random cada vez que se llama a un indice de la pregunta

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

export default obtenerIndiceAleatorio;