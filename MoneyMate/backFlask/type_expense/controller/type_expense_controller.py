from repo.type_expense_repo import *
from dao_schema.type_expense_schema import *
from flask import request, jsonify

typeExpenseSchema = TypeExpenseSchema()
typesExpensesSchema = TypeExpenseSchema(many=True)

def get_all_types_expenses():
    data = find_all_types_expenses_repo()
    return typesExpensesSchema.jsonify(data)

def get_type_expense_by_name(name):
    data = find_type_expense_by_name_repo(name)
    return typesExpensesSchema.jsonify(data)

def get_type_expense_by_id(id):
    typeExpenseSearched = find_type_expense_by_id_repo(id)
    return typeExpenseSchema.jsonify(typeExpenseSearched)

def post_new_type_expense():
    name = request.json["name"]
    type_expense_to_save = TypeExpense(None, name)
    saved_type_expense = save_new_type_expense_repo(type_expense_to_save)
    return typeExpenseSchema.jsonify(saved_type_expense)

def delete_type_expense(id):
    type_expense_deleted = remove_type_expense_repo(id)
    return jsonify({"message": f"The expense type {type_expense_deleted.name} was successfully deleted"})

def update_type_expense(id):
    id = id
    name = request.json["name"]
    type_expense_to_update = TypeExpense(id, name)
    updated_type_expense = modify_type_expense_repo(id, type_expense_to_update)
    return typeExpenseSchema.jsonify(updated_type_expense)
