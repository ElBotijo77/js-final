const url = "https://opentdb.com/api.php?amount=20&category=27&difficulty=medium";

async function obtenerPreguntas() {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const preguntas = datos.results;

        preguntas.forEach((pregunta, index) => {
            console.log(`Pregunta ${index + 1}: ${pregunta.question}`);
            console.log(`Respuesta correcta: ${pregunta.correct_answer}`);
            console.log("---------------------------");
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

obtenerPreguntas();
