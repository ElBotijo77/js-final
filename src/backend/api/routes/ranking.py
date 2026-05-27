from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from src.backend.api.controllers.connect_db import db

ranking_bp = Blueprint("ranking", __name__)
ranking_collection = db["ranking"]


def validar_puntuacion(valor):
    # Evitamos guardar datos raros: tiene que ser un numero entero positivo.
    if isinstance(valor, bool):
        return None

    try:
        puntuacion = int(valor)
    except (TypeError, ValueError):
        return None

    if puntuacion < 0:
        return None

    return puntuacion


@ranking_bp.post("/api/ranking")
def guardar_ranking():
    # Leemos el JSON que llega desde Postman, Thunder Client o el frontend.
    datos = request.get_json(silent=True) or {}
    username = str(datos.get("username", "")).strip()
    puntuacion = validar_puntuacion(datos.get("puntuacion"))

    # Validacion basica antes de tocar la base de datos.
    if not username:
        return jsonify({
            "ok": False,
            "error": "El campo username es obligatorio."
        }), 400

    if puntuacion is None:
        return jsonify({
            "ok": False,
            "error": "El campo puntuacion debe ser un numero entero mayor o igual que 0."
        }), 400

    documento = {
        "username": username,
        "puntuacion": puntuacion,
        "createdAt": datetime.now(timezone.utc)
    }

    # Guardamos una partida en la coleccion ranking.
    resultado = ranking_collection.insert_one(documento)

    return jsonify({
        "ok": True,
        "id": str(resultado.inserted_id),
        "ranking": {
            "username": username,
            "puntuacion": puntuacion,
            "createdAt": documento["createdAt"].isoformat()
        }
    }), 201


@ranking_bp.get("/api/ranking")
def obtener_ranking():
    # Por defecto devuelve 10 resultados, pero se puede cambiar con ?limit=5.
    try:
        limit = int(request.args.get("limit", 10))
    except ValueError:
        limit = 10

    limit = max(1, min(limit, 100))

    # Top de puntuaciones: mayor puntuacion primero y con limite de resultados.
    resultados = ranking_collection.find(
        {},
        {"_id": 0, "username": 1, "puntuacion": 1, "createdAt": 1}
    ).sort("puntuacion", -1).limit(limit)

    ranking = []
    for item in resultados:
        # Mongo guarda la fecha como datetime; la pasamos a texto para responder JSON.
        created_at = item.get("createdAt")
        if isinstance(created_at, datetime):
            created_at = created_at.isoformat()

        ranking.append({
            "username": item.get("username"),
            "puntuacion": item.get("puntuacion"),
            "createdAt": created_at
        })

    return jsonify({
        "ok": True,
        "limit": limit,
        "ranking": ranking
    })
