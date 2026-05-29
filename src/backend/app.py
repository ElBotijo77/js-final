import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

# Cargar variables de entorno y configurar Flask
load_dotenv()
app = Flask(__name__)
CORS(app) # Permite peticiones desde el frontend

# Conexión a MongoDB Atlas
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("TrivialChallenge") # Usa la base de datos definida en la URI
coleccion_usuarios = db["usuarios"]

# GET: Obtener el Top 5
@app.route('/api/ranking', methods=['GET'])
def get_top_5():
    try:
        # Busca todos, excluye el _id interno, ordena por puntuacion descendente (-1) y limita a 5
        top_usuarios = list(coleccion_usuarios.find({}, {"_id": 0}).sort("puntuacion", -1).limit(5))
        return jsonify(top_usuarios), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# POST: Guardar usuario nuevo
@app.route('/api/usuarios', methods=['POST'])
def crear_usuario():
    datos = request.get_json()
    nombre = datos.get("nombre")
    puntuacion = datos.get("puntuacion", 0) # Puntuación inicial si no se envía

    if not nombre:
        return jsonify({"error": "El nombre es obligatorio"}), 400

    try:
        nuevo_usuario = {"nombre": nombre, "puntuacion": puntuacion}
        coleccion_usuarios.insert_one(nuevo_usuario)
        return jsonify({"mensaje": "Usuario guardado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)