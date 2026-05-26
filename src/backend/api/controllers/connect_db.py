import os
from dotenv import load_model  # Instala con: pip install python-dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Cargamos las variables del archivo .env
# load_dotenv()

# Recuperamos la URI guardada de forma segura
uri = os.getenv("MONGO_URI")

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)