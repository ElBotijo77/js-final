/*Organizacion propuesta para los archivos js

/js
├── main.js              // punto de entrada
├── preguntas.js         // JSON de preguntas
├── juego.js             // lógica del juego
├── ui.js                // renderizado DOM
└── iconos.js            // lógica de iconos

*/

// Importamos las funciones especificas de cada archivo
import { insertarIcono } from "./ui.js";

//Cada vez que cambia de categoria, este metodo elige el icono y texto correspondiente 
insertarIcono("Ciencia");


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
