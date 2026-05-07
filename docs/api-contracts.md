# API Contracts (Borrador)

Este archivo documenta los contratos iniciales de API para que frontend y backend trabajen alineados.

## Endpoints previstos

### `POST /api/auth/register`
- **Uso:** crear nuevo usuario.
- **Body (ejemplo):**
  - `name`
  - `email`
  - `password`

### `POST /api/auth/login`
- **Uso:** iniciar sesion.
- **Body (ejemplo):**
  - `email`
  - `password`

### `GET /api/ranking/top`
- **Uso:** obtener top de jugadores.

### `POST /api/ranking/submit`
- **Uso:** guardar resultado final de una partida.
- **Body (ejemplo):**
  - `userId`
  - `score`
  - `correctAnswers`

### `POST /api/translate`
- **Uso:** traducir texto usando proveedor externo (ej. Google Translate).
- **Body (ejemplo):**
  - `text`
  - `targetLang`

## Fase del documento

- **Fase 1 (actual):** borrador inicial.
- **Fase 2-3:** formalizar validaciones y respuestas estandar.
