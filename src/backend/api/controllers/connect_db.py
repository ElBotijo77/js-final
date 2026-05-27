import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()

# Datos de conexion. Si no hay .env, intenta usar MongoDB local.
uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
database_name = os.getenv("MONGO_DB", "trivial_challenge")

client = MongoClient(uri, server_api=ServerApi('1'))
db = client[database_name]


def comprobar_conexion():
    # Ping sencillo para saber si MongoDB esta disponible.
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return True
    except Exception as e:
        print(e)
        return False
