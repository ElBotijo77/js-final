const url = "https://opentdb.com/api.php?amount=20&category=27&difficulty=medium";

async function obtenerPreguntas() {
    try {
        const respuesta = await fetch(url); // 1. Pedimos los datos
        const datos = await respuesta.json(); // 2. Los convertimos a objeto JS
        
        const preguntas = datos.results; // Aquí están tus 20 preguntas
        
        preguntas.forEach((pregunta, index) => {
            console.log(`Pregunta ${index + 1}: ${pregunta.question}`);
            console.log(`Respuesta correcta: ${pregunta.correct_answer}`);
            console.log("---------------------------");
        });

    } catch (error) {
        console.error("¡Error al obtener los datos!", error);
    }
}

obtenerPreguntas();ç



