# Arquitectura del Proyecto

## Objetivo

Definir una arquitectura simple de entender para el equipo actual, pero preparada para crecer a un producto mas profesional.

## Capas principales

- **Frontend (`src/frontend`)**: interfaz de usuario, estilos y llamadas HTTP.
- **Backend (`src/backend`)**: endpoints, logica de negocio, integraciones y acceso a datos.
- **Shared (`src/shared`)**: contratos y utilidades compartidas.

## Fases

- **Fase 1 (actual):** estructura de carpetas y documentacion.
- **Fase 2:** frontend vanilla organizado por modulos.
- **Fase 3:** backend funcional + base de datos.
- **Fase 4:** integraciones externas (ej. Google Translate) y pruebas.
- **Fase 5:** adopcion gradual de frameworks si el equipo lo necesita.

## Principios

- Mantener separadas responsabilidades de UI, negocio y datos.
- Evitar acoplar claves/API externas en frontend.
- Avanzar por fases pequenas sin bloquear el desarrollo.
