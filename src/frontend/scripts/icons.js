export function insertarIcono(categoria) {
    const img = document.getElementById("icono-categoria");

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
}