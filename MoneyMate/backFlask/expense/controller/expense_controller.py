from repo.expense_repo import *
from dao_schema.expense_schema import *
from flask import request, jsonify

expenseSchema = ExpenseSchema()
expensesSchema = ExpenseSchema(many=True)

def list_all_expenses():
    all_expenses = find_all_expenses_repo()
    return expensesSchema.jsonify(all_expenses)

def list_expenses_same_type(idType):
    expenses = find_all_expense_same_type_repo(idType)
    return expensesSchema.jsonify(expenses)

def get_expense_by_name(name):
    expenses = find_expense_by_name_repo(name)
    return expensesSchema.jsonify(expenses)

def get_expense_by_id(id):
    expense = find_expense_by_id_repo(id)
    return expenseSchema.jsonify(expense)

def post_new_expense():
    name = request.json["name"]
    amount = request.json["amount"]
    date = request.json["date"]
    type_expense_id = request.json["type_expense_id"]
    expense_to_save = Expense(None, name, type_expense_id, amount, date)
    saved_expense = save_new_expense_repo(expense_to_save)
    return ExpenseSchema.jsonify(saved_expense)

def delete_expense(id):
    expense_deleted = remove_expense_repo(id)
    return jsonify({"message" : f"Success!! expense {expense_deleted.name} was removed"})

def update_expense(id):
    name = request.json["name"]
    amount = request.json["amount"]
    date = request.json["date"]
    type_expense_id = request.json["type_expense_id"]
    expense_to_update = Expense(id, name, type_expense_id, amount, date)
    updated_expense = modify_expense_repo(expense_to_update)
    return ExpenseSchema.jsonify(update_expense)
