# Requisitos del Juego Trivial Web

## CHANGELOG

### Version 2.0 - 2026-04-20

**Foco: Clarificacion del MVP de juego por categorias**

- **Alcance:** Se elimina ambiguedad sobre modos de juego. El MVP queda definido como juego individual (1 jugador por sesion) con rondas de preguntas por categorias.
- **Mecanica principal:** Se consolida el flujo base: seleccionar categoria -> responder pregunta -> validar resultado -> sumar puntaje -> siguiente pregunta.
- **Respuestas:** Cada pregunta tiene exactamente 4 opciones y solo 1 respuesta correcta en MVP.
- **Progresion:** Se define sesion de juego con cantidad fija de preguntas por partida y ranking final por puntaje.
- **Post-MVP:** Se mueven modos multijugador, torneos, power-ups y chat a fases futuras.
- **Estructura del sitio:** Se priorizan vistas de inicio, seleccion de categoria, pregunta activa, resultado de ronda y ranking.

### Version 1.0 - Inicial

Requisitos base del juego tipo trivial con mezcla de ideas de MVP y funciones futuras.

## 1. Vision General y Alcance

- **Tipo de producto:** Juego web tipo trivial con preguntas de cultura general y tematicas especificas.
- **MVP:** Juego individual por rondas. El usuario responde preguntas con 4 opciones, acumula puntaje y visualiza su posicion en ranking.
- **Tematica de preguntas:** Multiples categorias (por ejemplo: Historia, Ciencia, Deportes, Cine, Tecnologia).
- **Plataforma:** Aplicacion web responsive para escritorio y movil.
- **Modelo de despliegue:** Arquitectura preparada para multi-tenant en futuro (diferentes marcas o comunidades), aunque MVP funciona en un solo entorno.

## 2. Roles de Usuario y Permisos

- **Administrador**
  - Crear y editar categorias.
  - Crear, editar, activar o desactivar preguntas.
  - Definir la respuesta correcta y 3 distractores por pregunta.
  - Revisar estadisticas basicas (preguntas mas falladas, puntajes promedio).
  - Moderar ranking y gestionar usuarios en caso de abuso.

- **Jugador**
  - Registrarse o iniciar sesion para guardar progreso y puntajes.
  - Iniciar partida y elegir categoria por ronda (segun configuracion).
  - Responder preguntas dentro del tiempo limite (si se habilita temporizador).
  - Consultar resultado por pregunta y puntaje acumulado.
  - Ver ranking global y su historial de partidas.

## 3. Mecanica de Juego y Flujo de Partida

- **Categorias:** El sistema debe soportar multiples categorias configurables por el administrador.
- **Formato de pregunta:** Cada pregunta presenta:
  - Enunciado unico.
  - 4 posibles respuestas.
  - 1 respuesta correcta.
- **Flujo de juego (MVP):**
  1. **Inicio de partida:** El jugador inicia una nueva partida.
  2. **Seleccion de categoria:** El jugador elige categoria (o el sistema la asigna, segun configuracion).
  3. **Pregunta activa:** Se muestra 1 pregunta con 4 respuestas posibles.
  4. **Respuesta del jugador:** El jugador selecciona una opcion.
  5. **Validacion inmediata:** El sistema informa si es correcta o incorrecta.
  6. **Puntaje:** Se actualiza el puntaje total.
  7. **Siguiente ronda:** Se repite el flujo hasta completar la cantidad de preguntas de la partida.
  8. **Cierre de partida:** Se muestra resultado final, resumen de aciertos/errores y posicion en ranking.

## 4. Puntaje, Ranking y Progreso

- **Sistema de puntaje:**
  - Respuesta correcta: suma puntos.
  - Respuesta incorrecta: 0 puntos (o penalizacion opcional configurable a futuro).
  - Bonus por tiempo: fuera del MVP inicial (opcional en fases siguientes).
- **Ranking:**
  - Ranking global por puntaje acumulado.
  - Criterios de desempate (ejemplo): mayor cantidad de aciertos, menor tiempo total.
  - Actualizacion en tiempo casi real al finalizar cada partida.
- **Historial del jugador:**
  - Partidas jugadas.
  - Puntaje por partida.
  - Porcentaje de acierto por categoria.

## 5. Banco de Preguntas y Contenido

- **Gestor de preguntas (admin):**
  - Alta, baja logica y modificacion de preguntas.
  - Asociacion obligatoria de cada pregunta a una categoria.
  - Validacion para asegurar 4 opciones no vacias y una unica correcta.
- **Calidad del contenido:**
  - Evitar preguntas duplicadas.
  - Nivel de dificultad (facil, medio, dificil) como atributo opcional.
  - Versionado de contenido para futuras temporadas.

## 6. Autenticacion y Sesion

- **Registro/Login:** Email + password en MVP.
- **Sesion:** Mantener sesion activa de forma segura.
- **Perfil:** Nombre visible para ranking y estadisticas.
- **Invitado (opcional):** Jugar sin registro con limitaciones (sin historial persistente).

## 7. Estructura de Paginas (Site Map MVP)

- **Home**
  - Presentacion del juego.
  - CTA para iniciar sesion o empezar partida.
- **Login / Registro**
  - Acceso y creacion de cuenta.
- **Lobby de Partida**
  - Configuracion basica de partida.
  - Seleccion de categoria (si aplica).
- **Vista de Pregunta**
  - Enunciado.
  - 4 opciones de respuesta.
  - Temporizador opcional.
- **Resultado de Ronda**
  - Feedback de respuesta correcta/incorrecta.
  - Puntaje actualizado.
- **Resultado Final**
  - Resumen de la partida.
  - Acceso rapido a nueva partida.
- **Ranking**
  - Top jugadores.
  - Posicion personal.
- **Panel Admin**
  - Gestion de categorias y preguntas.
  - Estadisticas basicas.

## 8. Requisitos No Funcionales

- **Rendimiento:** Tiempo de carga bajo en vistas clave (home, pregunta, ranking).
- **Escalabilidad:** Soportar crecimiento del banco de preguntas y de usuarios concurrentes.
- **Seguridad:** Proteccion de rutas admin, validacion de entradas y manejo seguro de credenciales.
- **Usabilidad:** Interfaz clara, accesible y responsive.
- **Observabilidad:** Logs de errores y metricas basicas de uso para iterar producto.

## 9. Roadmap Post-MVP

- Modo multijugador en tiempo real.
- Torneos semanales/mensuales.
- Sistema de vidas, comodines o power-ups.
- Recompensas, logros y progresion por niveles.
- Retos entre amigos y salas privadas.
- Pago in-app para features premium (skins, packs de preguntas).
