from dao.expense_type_dao import ExpenseType
from dao.user_dao import User
from database.db import db

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), nullable=False)
    expense_type_id = db.Column(db.Integer, db.ForeignKey(ExpenseType.id))
    expense_type = db.Relationship("ExpenseType", backref=db.backref('expense_type'))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.Relationship("User", backref=db.backref('user'), overlaps="their_expenses,their_expenses")
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(70), nullable=False)


    def __init__(self, id, name, expense_type_id, user_id, amount, date):
        self.id = id
        self.name = name
        self.amount = amount
        self.date = date
        self.expense_type_id = expense_type_id
        self.user_id = user_id