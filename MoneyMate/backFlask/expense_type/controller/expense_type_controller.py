from repo.expense_type_repo import *
from dao_schema.expense_type_schema import ExpenseTypeSchema
from flask import request, jsonify

expenseTypeSchema = ExpenseTypeSchema()
expensesTypesSchema = ExpenseTypeSchema(many=True)

def get_all_expenses_types():
    data = find_all_expenses_types_repo()
    return expensesTypesSchema.jsonify(data)

def get_expense_type_by_name(name):
    data = find_expense_type_by_name_repo(name)
    return expensesTypesSchema.jsonify(data)

def get_expense_type_by_id(id):
    expenseTypeSearched = find_expense_type_by_id_repo(id)
    return expenseTypeSchema.jsonify(expenseTypeSearched)

def post_new_expense_type():
    name = request.json["name"]
    expense_type_to_save = ExpenseType(None, name)
    saved_expense_type = save_new_expense_type_repo(expense_type_to_save)
    return expenseTypeSchema.jsonify(saved_expense_type)

def delete_expense_type(id):
    expense_type_deleted = remove_expense_type_repo(id)
    return jsonify({"message": f"The expense type {expense_type_deleted.name} was successfully deleted"})

def update_expense_type(id):
    id = id
    name = request.json["name"]
    expense_type_to_update = ExpenseType(id, name)
    updated_expense_type = modify_expense_type_repo(id, expense_type_to_update)
    return expenseTypeSchema.jsonify(updated_expense_type)
