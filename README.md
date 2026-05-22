## 🌐 Deployment

La aplicación está desplegada y alojada en Cloudflare Workers. Puede acceder al entorno de producción a través del siguiente enlace:

**Enlace:** [https://js-final.nikolaibellics.workers.dev/](https://js-final.nikolaibellics.workers.dev/)


# Juego Trivial Web - Estructura Base Escalable

Este repositorio arranca como proyecto sencillo para estudiantes (paginas estaticas + JS vanilla), pero queda preparado para evolucionar a una arquitectura mas profesional con backend, APIs externas y base de datos.

## Estado actual

- **Fase 1 (actual):** estructura del proyecto y documentacion base.
- **Fase 2 (siguiente):** frontend vanilla organizado en `src/frontend` y primeras rutas de backend.
- **Fase 3:** integracion de base de datos y servicios externos (por ejemplo, traduccion).
- **Fase 4+:** testing, mejoras de arquitectura y adopcion gradual de frameworks.

## Estructura principal

- `docs/`: documentacion funcional y tecnica.
- `public/`: assets publicos estaticos (imagenes, iconos).
- `src/frontend/`: capas de cliente (paginas, estilos, servicios y estado).
- `src/backend/`: API, logica de negocio, infraestructura y configuracion.
- `src/shared/`: tipos, esquemas y constantes compartidas.
- `tests/`: pruebas unitarias, integracion y end-to-end.
- `scripts/`: automatizaciones del proyecto.

## Explicación breve del juego

**Trivial Challenge** es un juego digital interactivo diseñado para poner a prueba los conocimientos de los jugadores a través de una experiencia dinámica y competitiva.

`Mecánica del juego`

- El sistema de vidas: El jugador comienza con 3 vidas. Cada respuesta incorrecta resta una vida; si el contador llega a cero, la partida termina (Game Over).
- El banco de preguntas: El juego cuenta con un total de 380 preguntas distribuidas en 10 categorías: 9 de ellas tienen 40 preguntas y una categoría especial tiene 20 preguntas.

`Categorías disponibles`

Para cubrir todos los perfiles de jugadores, hemos dividido el contenido en:

- Ciencia, Tecnología y Astronomía.
- Cine y Música.
- Geografía e Historia.
- Gastronomía, Motor y Meteorología.
