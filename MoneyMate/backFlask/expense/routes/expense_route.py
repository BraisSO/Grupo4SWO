from flask import Blueprint
from expense.controller.expense_controller import *
from flask_jwt_extended import jwt_required

expenses_routes = Blueprint("expense_route", __name__, url_prefix="/api/expense")

@expenses_routes.get("/all")
@jwt_required()
def list_all_expenses_route():
    return list_all_expenses()

@expenses_routes.get("/of-type/<int:idType>")
@jwt_required()
def list_expenses_same_type_route(idType):
    return list_expenses_same_type(idType)

@expenses_routes.get("/by-name/<string:name>")
@jwt_required()
def get_expense_by_name_route(name):
    return get_expense_by_name(name)

@expenses_routes.get("/similar/<string:name>")
@jwt_required()
def get_similar_expenses(name):
    return get_expense_similar_to(name)

@expenses_routes.get("/by-id/<int:id>")
@jwt_required()
def get_expense_by_id_route(id):
    return get_expense_by_id(id)

@expenses_routes.post("/new")
@jwt_required()
def post_new_expense_route():
    return post_new_expense()

@expenses_routes.delete("/remove/<int:id>")
@jwt_required()
def delete_expense_route(id):
    return delete_expense(id)

@expenses_routes.put("/modify/<int:id>")
@jwt_required()
def update_expense_route(id):
    return update_expense(id)

@expenses_routes.delete("/clear")
@jwt_required()
def delete_all_expenses_route():
    return delete_all_expenses()