from dao.expense_type_dao import ExpenseType
from database.db import db

def find_all_expenses_types_repo():
    return ExpenseType.query.all()

def find_expense_type_by_name_repo(name):
    data = ExpenseType.query.filter(ExpenseType.name == name).all()
    result = []
    for i in data:
        info = {
            'id': i.id,
            'name': i.name,
        }
        result.append(info)
    print(result)
    return result

def find_expense_type_by_id_repo(id):
    return ExpenseType.query.get(id)

def save_new_expense_type_repo(ExpenseType):
    db.session.add(ExpenseType)
    db.session.commit()
    return ExpenseType

def remove_expense_type_repo(id):
    expense_type_to_delete = ExpenseType.query.get(id)
    db.session.delete(expense_type_to_delete)
    db.session.commit()
    return expense_type_to_delete

def modify_expense_type_repo(id, expense_type_altered):
    expense_type_to_modify = ExpenseType.query.get(id)
    expense_type_to_modify.name = expense_type_altered.name
    db.session.commit()
    return expense_type_to_modify