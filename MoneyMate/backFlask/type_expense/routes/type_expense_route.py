from flask import Blueprint
from type_expense.controller.type_expense_controller import *

types_expenses_routes = Blueprint("type_expense_route", __name__, url_prefix="/api/type-expense")

@types_expenses_routes.get("/all")
def get_all_types_expenses_route():
    return get_all_types_expenses()

@types_expenses_routes.get("/by-name/<string:name>")
def get_type_expense_by_name_route(name):
    return get_type_expense_by_name(name)

@types_expenses_routes.get("/by-id/<int:id>")
def get_type_expense_by_id_route(id):
    return get_type_expense_by_id(id)

@types_expenses_routes.post("/save")
def post_new_type_expense_route():
    return post_new_type_expense()

@types_expenses_routes.delete("/remove/<int:id>")
def delete_type_expense_route(id):
    return delete_type_expense(id)

@types_expenses_routes.put("/update/<int:id>")
def update_type_expense_route(id):
    return update_type_expense(id)