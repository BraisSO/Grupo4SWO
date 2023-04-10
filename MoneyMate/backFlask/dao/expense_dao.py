from datetime import datetime
from dao.type_expense_dao import TypeExpense
from database.db import db

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), nullable=False)
    type_expense_id = db.Column(db.Integer, db.ForeignKey(TypeExpense.id))
    type_expense = db.Relationship("tipes_expenses", backref="expenses")
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime)


    def __init__(self, id, name, type_expense_id, amount, dateString):
        self.id = id
        self.name = name
        self.amount = amount
        self.date = datetime.strptime(dateString, '%y/%m/%d %H:%M:%S') # Aquí estoy suponiendo que el input de tipo date del archivo home.component.html en el front devuelve un tipo date con este formato parseado a string
        self.type_expense_id = type_expense_id

    #  type:string="";
    #  amount:Number=0;
    #  date:string="";