from dao.expense_dao import Expense
from database.db import db

def find_all_expenses_repo():
    return Expense.query.all()

def find_all_expense_same_type_repo(idType):
    data = Expense.query.filter(Expense.type_expense_id == idType).all()
    result = []
    for i in data:
        info = {
            'id': i.id,
            'name': i.name,
            'amount': i.amount,
            'date' : i.date,
            'type_expense_id' : i.type_expense_id
        }
        result.append(info)
    print(result)
    return result

def find_expense_by_name_repo(name):
    data = Expense.query.filter(Expense.name == name).all()
    result = []
    for i in data:
        info = {
            'id': i.id,
            'name': i.name,
            'amount': i.amount,
            'date' : i.date,
            'type_expense_id' : i.type_expense_id
        }
        result.append(info)
    print(result)
    return result

def find_expense_by_id_repo(id):
    return Expense.query.get(id)

def save_new_expense_repo(expense):
    db.session.add(expense)
    db.session.commit()
    return expense

def remove_expense_repo(id):
    expense_to_remove = Expense.query.get(id)
    db.session.remove(expense_to_remove)
    db.session.commit()
    return expense_to_remove

def modify_expense_repo(id, expense_altered):
    expense_to_modify = Expense.query.get(id)
    expense_to_modify.name = expense_altered.name
    expense_to_modify.amount = expense_altered.amount
    expense_to_modify.date = expense_altered.date
    expense_to_modify.type_expense_id = expense_altered.type_expense_id
    db.session.commit()
    return expense_to_modify