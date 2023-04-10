from dao.type_expense_dao import TypeExpense
from database.db import db

def find_all_types_expenses_repo():
    return TypeExpense.query.all()

def find_type_expense_by_id_repo(id):
    return TypeExpense.query.get(id)

def find_type_expense_by_name_repo(name):
    data = TypeExpense.query.filter(TypeExpense.name == name).all()
    result = []
    for i in data:
        info = {
            'id': i.id,
            'name': i.name,
        }
        result.append(info)
    print(result)
    return result

def save_new_type_expense_repo(typeExpense):
    db.session.add(typeExpense)
    db.session.commit()
    return typeExpense

def remove_type_expense_repo(id):
    type_expense_to_delete = TypeExpense.query.get(id)
    db.session.delete(type_expense_to_delete)
    db.session.commit()

def modify_type_expense_repo(id, type_expense_altered):
    type_expense_to_modify = TypeExpense.query.get(id)
    type_expense_to_modify.name = type_expense_altered.name
    db.session.commit()
    return type_expense_to_modify