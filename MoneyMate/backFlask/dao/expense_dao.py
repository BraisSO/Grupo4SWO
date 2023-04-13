from datetime import datetime
from dao.type_expense_dao import TypeExpense
from dao.user_dao import User
from database.db import db

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), nullable=False)
    type_expense_id = db.Column(db.Integer, db.ForeignKey(TypeExpense.id))
    type_expense = db.Relationship("TypeExpense", backref=db.backref('type_expense'))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.Relationship("User", backref=db.backref('user'), overlaps="their_expenses,their_expenses")
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime)


    def __init__(self, id, name, type_expense_id, user_id, amount, dateString):
        self.id = id
        self.name = name
        self.amount = amount
        self.date = datetime.strptime(dateString, '%Y/%m/%d %H:%M:%S') # Aquí estoy suponiendo que el input de tipo date del archivo home.component.html en el front devuelve un tipo date con este formato parseado a string
        self.type_expense_id = type_expense_id
        self.user_id = user_id
# To silence this warning, add the parameter 'overlaps="their_expenses,their_expenses"' to the 'Expense.user' relationship.