import datetime

import jwt
from dao_schema.user_schema import UserSchema
from flask import request, jsonify
from flask_jwt_extended import create_access_token, decode_token
from repo.user_repo import *
from werkzeug.security import generate_password_hash, check_password_hash
from envs.dev.dev_env import get_database_config

userSchema = UserSchema()

# Non called by route methods

def put_payload_token(user):
    payload = {
        "id" : user.id,
        "username": user.username
    }
    return payload

def create_token(user):
    token_config = {
        "payload" : put_payload_token(user),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2),
        'headers' : {'typ': "JWT" }
    }
    token = create_access_token(token_config)
    return jsonify({"userToken": token})

def get_id_from_token():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
        # encriptation_key = get_database_config().get('SECRET_KEY')
        payload = jwt.decode(token, algorithms="HS256") #Aquí hai un faio que devolve un error 422
        print(payload)
        id = payload.id
        print(id)
        return id
    else:
        return None
    

# Called by route methods

def sign_in_controller():
    username = request.json["username"]
    email = request.json["email"]
    first_name = request.json["firstName"]
    surname1 = request.json["surname1"]
    if "surname2" in request.json:
        surname2 = request.json["surname2"]
    else:
        surname2 = None
    password = request.json["password"]
    password_hash = generate_password_hash(password)
    new_user = User(None, username, email, first_name, surname1, surname2, password_hash)
    data = sign_in_repo(new_user)
    return userSchema.jsonify(data)

def login_controller():
    username = request.json["username"]
    password = request.json["password"]
    user = login_repo(username)
    if user is not None and check_password_hash(user.password, password):
        return create_token(user), 200
    else:
        return jsonify({"error" : "Unauthorized"}), 401
    
def delete_controller():
    id = get_id_from_token()
    user_deleted = delete_repo(id)
    return jsonify({"id" : user_deleted.id})

def update_controller():
    username = request.json["username"]
    email = request.json["email"]
    first_name = request.json["firstName"]
    surname1 = request.json["surname1"]
    if "surname2" in request.json:
        surname2 = request.json["surname2"]
    else:
        surname2 = None
    password = request.json["password"]
    password_hash = generate_password_hash(password)
    new_user = User(None, username, email, first_name, surname1, surname2, password_hash)
    print("Hola")
    id = get_id_from_token()
    user_updated = update_repo(id, new_user)
    new_token = create_token(user_updated)
    return jsonify({"user": userSchema.jsonify(user_updated), "userToken" : new_token.json["userToken"]}) # Non me fio moito disto
    # Debe devolver un json con duas claves, user e userToken. A primeiro cos novos datos do usuario e a segunda co novo token