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


// Genera un array con valores de 0,1,2... y los baraja
function arrayAleatorio(tamano) {
    indices = [];
    for (let i = 0; i < tamano; i++) {
        indices.push(i);
    }
    shuffleArray(indices);
    return indices;
}

export default arrayAleatorio;