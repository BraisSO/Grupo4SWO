from flask import Blueprint
from expense_type.controller.expense_type_controller import *

expenses_types_routes = Blueprint("expense_type_route", __name__, url_prefix="/api/type-expense")

@expenses_types_routes.get("/all")
def get_all_expenses_types_route():
    return get_all_expenses_types()

@expenses_types_routes.get("/by-name/<string:name>")
def get_expense_type_by_name_route(name):
    return get_expense_type_by_name(name)

@expenses_types_routes.get("/by-id/<int:id>")
def get_expense_type_by_id_route(id):
    return get_expense_type_by_id(id)

@expenses_types_routes.post("/save")
def post_new_expense_type_route():
    return post_new_expense_type()

@expenses_types_routes.delete("/remove/<int:id>")
def delete_expense_type_route(id):
    return delete_expense_type(id)

@expenses_types_routes.put("/update/<int:id>")
def update_expense_type_route(id):
    return update_expense_type(id)