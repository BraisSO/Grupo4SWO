from repo.expense_repo import *
from dao_schema.expense_schema import ExpenseSchema
from flask import request, jsonify
from user.controller.user_controller import get_id_from_token

expenseSchema = ExpenseSchema()
expensesSchema = ExpenseSchema(many=True)

def list_all_expenses():
    user_id = get_id_from_token()
    all_expenses = find_all_expenses_repo(user_id)
    return expensesSchema.jsonify(all_expenses)

def list_expenses_same_type(idType):
    user_id = get_id_from_token()
    expenses = find_all_expense_same_type_repo(user_id, idType)
    return expensesSchema.jsonify(expenses)


def get_expense_similar_to(name):
    user_id = get_id_from_token()
    expenses = find_expense_like_repo(user_id, name)
    return expensesSchema.jsonify(expenses)

def get_expense_by_name(name):
    user_id = get_id_from_token()
    expenses = find_expense_by_name_repo(user_id, name)
    return expensesSchema.jsonify(expenses)

def get_expense_by_id(id):
    user_id = get_id_from_token()
    expense = find_expense_by_id_repo(user_id, id)
    return expenseSchema.jsonify(expense)

def post_new_expense():
    name = request.json["name"]
    amount = request.json["amount"]
    date = request.json["date"]
    expense_type_id = request.json["expense_type_id"]
    user_id = get_id_from_token()
    expense_to_save = Expense(None, name, expense_type_id, user_id, amount, date)
    saved_expense = save_new_expense_repo(expense_to_save)
    return expenseSchema.jsonify(saved_expense)

def delete_expense(id):
    user_id = get_id_from_token()
    expense_deleted = remove_expense_repo(user_id, id)
    if expense_deleted is not False:
        return jsonify({"message" : f"Success!! expense {expense_deleted.name} were removed"})
    else:
        return jsonify({"message" : "Error!! You have not this expense."})

def delete_all_expenses():
    user_id = get_id_from_token()
    delete_all_expenses_repo(user_id)
    return jsonify({"message" : "Success!! All your expenses were removed."})

def update_expense(id):
    name = request.json["name"]
    amount = request.json["amount"]
    date = request.json["date"]
    expense_type_id = request.json["expense_type_id"]
    user_id = get_id_from_token()
    expense_to_update = Expense(None, name, expense_type_id, user_id, amount, date)
    updated_expense = modify_expense_repo(id, expense_to_update)
    if updated_expense is not False:
        return expenseSchema.jsonify(updated_expense)
    else:
        return jsonify({"message" : "Error!! You have not expense."})
