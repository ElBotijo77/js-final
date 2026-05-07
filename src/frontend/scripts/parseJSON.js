//Carga las preguntas desde el archivo JSON devolviendo una promesa con todas las preguntas.

async function cargarPreguntas() {
  try {

    // La ruta del archivo sera la relativa desde donde carge el HTML
    const respuesta = await fetch('../data/preguntas.json');

    //Lanzará una Excepcion si la peticion no ha sido buena
    if (!respuesta.ok) {
      throw new Error(`No se ha podido cargar el JSON: ${respuesta.statusText}`);
    }

    // Conversion de texto plano a datos manejables
    const preguntas = await respuesta.json();

    // Guardamos en localStorage para que no tenga que volver a cargar el 
    // JSON cada vez que se haga refresh de la pagina
    localStorage.setItem('preguntas_quiz', JSON.stringify(preguntas));

    return preguntas;

  } catch (error) {
    console.error("Algo fallo. Aqui tienes el error: ", error);
    return [];
  }
}



//Obtener las preguntas del localStorage o las carga si no existe llamando a la funcion cargarPreguntas() 

async function obtenerPreguntas() {
  const guardado = localStorage.getItem('preguntas_quiz');

  if (guardado) {
    return JSON.parse(guardado);
  }

  //Si no existe en el localStorage, se carga nuevamente desde el JSON
  return await cargarPreguntas();
}







//-------------------BORRAR EN EL FUTURO-----------------
//-------------------BORRAR EN EL FUTURO-----------------
//-------------------BORRAR EN EL FUTURO-----------------
//-------------------BORRAR EN EL FUTURO-----------------

/**
 * Ejemplo de cómo convertir el array en un objeto indexado por ID
 * Útil si se necesita buscar una pregunta específica rápidamente por su ID.
 */
function convertirAObjeto(arrayPreguntas) {
  return arrayPreguntas.reduce((acc, pregunta) => {
    acc[pregunta.id] = pregunta;
    return acc;
  }, {});
}

/* Ejemplo de uso:
obtenerPreguntas().then(preguntas => {
    console.log("Preguntas cargadas como Array:", preguntas);
    
    // Si prefieres manejarlo como objeto:
    const preguntasMap = convertirAObjeto(preguntas);
    console.log("Pregunta con ID 1:", preguntasMap[1]);
});
*/