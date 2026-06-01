import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)

# Habilita CORS para rutas /api/* 
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Obtén MONGO_URI desde .env
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("Falta MONGO_URI en variables de entorno")

client = MongoClient(MONGO_URI)
db = client.get_database("TrivialChallenge")
coleccion_usuarios = db["usuarios"]

@app.route("/")
def home():
    return {"status": "healthy"}, 200

@app.route("/api/usuarios", methods=["POST"])
def guardar_usuario():
    datos = request.get_json(force=True)
    nombre = datos.get("usuario")
    puntuacion = datos.get("puntuacion")

    if not nombre:
        return jsonify({"error": "Nombre vacío"}), 400

    coleccion_usuarios.insert_one({
        "nombre": nombre,
        "puntuacion": puntuacion,
        "fecha": datetime.utcnow()
    })
    return jsonify({"mensaje": "Datos guardados con éxito"}), 201

@app.route("/api/ranking", methods=["GET"])
def get_top_5():
    try:
        top_usuarios = list(
            coleccion_usuarios.find({}, {"_id": 0}).sort("puntuacion", -1).limit(5)
        )
        return jsonify(top_usuarios), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))