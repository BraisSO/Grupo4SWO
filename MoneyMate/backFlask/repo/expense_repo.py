from dao.expense_dao import Expense
from database.db import db

# # CRUD before Users had been created

# def find_all_expenses_repo():
#     return Expense.query.all()

# def find_all_expense_same_type_repo(idType):
#     data = Expense.query.filter(Expense.expense_type_id == idType).all()
#     result = []
#     for i in data:
#         info = {
#             'id': i.id,
#             'name': i.name,
#             'amount': i.amount,
#             'date' : i.date,
#         }
#         result.append(info)
#     print(result)
#     return result

# def find_expense_by_name_repo(name):
#     data = Expense.query.filter(Expense.name == name).all()
#     result = []
#     for i in data:
#         info = {
#             'id': i.id,
#             'name': i.name,
#             'amount': i.amount,
#             'date' : i.date,
#             'expense_type_id' : i.expense_type_id
#         }
#         result.append(info)
#     print(result)
#     return result

# def find_expense_by_id_repo(id):
#     return Expense.query.get(id)

# def save_new_expense_repo(expense):
#     db.session.add(expense)
#     db.session.commit()
#     return expense

# def remove_expense_repo(id):
#     expense_to_remove = Expense.query.get(id)
#     db.session.delete(expense_to_remove)
#     db.session.commit()
#     return expense_to_remove

# def modify_expense_repo(id, expense_altered):
#     expense_to_modify = Expense.query.get(id)
#     expense_to_modify.name = expense_altered.name
#     expense_to_modify.amount = expense_altered.amount
#     expense_to_modify.date = expense_altered.date
#     expense_to_modify.expense_type_id = expense_altered.expense_type_id
#     db.session.commit()
#     return expense_to_modify

# CRUD after Users had been created

def find_all_expenses_repo(user_id):
    data = Expense.query.filter(Expense.user_id == user_id).all()
    result = []
    for i in data:
        info = {
            'id': i.id,
            'name': i.name,
            'amount': i.amount,
            'date' : i.date,
            'expense_type_id' : i.expense_type_id,
            'user_id' : i.user_id
        }
        result.append(info)
    return result

def find_all_expense_same_type_repo(user_id, idType):
    data = Expense.query.filter(Expense.expense_type_id == idType).all()
    result = []
    for i in data:
        if i.user_id == user_id:
            info = {
                'id': i.id,
                'name': i.name,
                'amount': i.amount,
                'date' : i.date,
                'expense_type_id' : i.expense_type_id,
                'user_id' : i.user_id
            }
            result.append(info)
    print(result)
    return result

def find_expense_by_name_repo(user_id, name):
    data = Expense.query.filter(Expense.name == name).all()
    result = []
    for i in data:
        if i.user_id == user_id:
            info = {
                'id': i.id,
                'name': i.name,
                'amount': i.amount,
                'date' : i.date,
                'expense_type_id' : i.expense_type_id,
                'user_id' : i.user_id
            }
            result.append(info)
    print(result)
    return result

def find_expense_like_repo(user_id, name):
    data = Expense.query.filter(Expense.name.ilike("%"+name+"%")).all()
    result = []
    for i in data:
        if i.user_id == user_id:
            info = {
                'id': i.id,
                'name': i.name,
                'amount': i.amount,
                'date' : i.date,
                'expense_type_id' : i.expense_type_id,
                'user_id' : i.user_id
            }
            result.append(info)
    print(result)
    return result

def find_expense_by_id_repo(user_id, id):
    expense = Expense.query.get(id)
    if expense  is not None and expense.user_id == user_id:
        return expense
    else:
        return False

def save_new_expense_repo(expense):
    db.session.add(expense)
    db.session.commit()
    return expense

def remove_expense_repo(user_id, id):
    expense_to_remove = Expense.query.get(id)
    if expense_to_remove is not None and expense_to_remove.user_id == user_id:
        db.session.delete(expense_to_remove)
        db.session.commit()
        return expense_to_remove
    else:
        return False

def modify_expense_repo(id, expense_altered):
    expense_to_modify = Expense.query.get(id)
    if expense_to_modify is not None and expense_to_modify.user_id == expense_altered.user_id:
        expense_to_modify.name = expense_altered.name
        expense_to_modify.amount = expense_altered.amount
        expense_to_modify.date = expense_altered.date
        expense_to_modify.expense_type_id = expense_altered.expense_type_id
        db.session.commit()
        return expense_to_modify
    else:
        return False

def delete_all_expenses_repo(user_id):
    data = Expense.query.filter(Expense.user_id == user_id).all()
    for expense in data:
        db.session.delete(expense)
    db.session.commit()