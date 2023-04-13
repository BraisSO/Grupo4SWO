from flask import Blueprint
from user.controller.user_controller import *
from flask_jwt_extended import jwt_required

users_routes = Blueprint('user_routes', __name__, url_prefix="/api/user")

@users_routes.post("/sign-in")
def sign_in_route():
    return sign_in_controller()

@users_routes.post("/login")
def login_route():
    return login_controller()

@users_routes.put("/update")
@jwt_required()
def update_route():
    return update_controller()

@users_routes.delete("/remove")
@jwt_required()
def delete_route():
    return delete_controller()