from dao.user_dao import User
from database.db import db

def sign_in_repo(user):
    db.session.add(user)
    db.session.commit()
    return user

def login_repo(username):
    user = User.query.filter_by(username = username).one_or_none()
    return user

def update_repo(id, user_new_data):
    user_to_update = User.query.get(id)
    user_to_update.username = user_new_data.username
    user_to_update.email = user_new_data.email
    user_to_update.first_name = user_new_data.first_name
    user_to_update.surname1 = user_new_data.surname1
    user_to_update.surname2 = user_new_data.surname2
    user_to_update.password = user_new_data.password
    db.session.commit()
    return user_to_update

def delete_repo(id):
    user_to_delete = User.query.get(id)
    db.session.delete(user_to_delete)
    db.session.commit()
    return user_to_delete