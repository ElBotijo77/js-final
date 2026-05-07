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
import { obtenerIndiceAleatorio } from "./questions.js";

//Cada vez que cambia de categoria, este metodo elige el icono y texto correspondiente 
insertarIcono("Ciencia");

