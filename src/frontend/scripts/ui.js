// Mostrará la categoria principal, cogiendolo del JSON e incrutará 
// el icono correspondiente a la categoria dada
export function insertarIcono(categoria) {
    const img = document.getElementById("icono-categoria");
    const texto = document.getElementById("texto-categoria");

    if (!img) return;

    const basePath = "/assets/icons/";

    const iconos = {
        "Ciencia": "ciencia.png",
        "Astronomia": "astronomia.png",
        "Gastronomia": "comida.png",
        "Java": "java.png"
    };

    const archivo = iconos[categoria] || "default.png";

    img.src = basePath + archivo;
    img.alt = categoria;

    texto.textContent = categoria;
}