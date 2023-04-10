from flask import Blueprint
from type_expense.controller.type_expense_controller import *

types_expenses_routes = Blueprint("type_expense_route", __name__, url_prefix="/api/type-expense")