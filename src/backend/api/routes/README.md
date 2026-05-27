# Carpeta `routes`

- **Que guarda:** definicion de rutas HTTP del backend.
- **Uso actual:** contiene `ranking.py` con:
  - `POST /api/ranking`: guarda `username` y `puntuacion` en MongoDB.
  - `GET /api/ranking?limit=10`: devuelve el Top X ordenado por puntuacion descendente.
- **Fase actual:** Fase 1.
- **Fase futura:** Fase 2, crear rutas para auth, ranking y translate.

## Pruebas rapidas

Arrancar el servidor:

```bash
python -m src.backend.app
```

Guardar puntuacion:

```bash
curl -X POST http://localhost:5000/api/ranking \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"Laura\",\"puntuacion\":8}"
```

Consultar ranking:

```bash
curl http://localhost:5000/api/ranking?limit=10
```
