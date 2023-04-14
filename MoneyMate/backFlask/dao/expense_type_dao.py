from database.db import db

class ExpenseType(db.Model):
    __tablename__="expenses_types"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    expenses = db.Relationship("Expense", backref="expenses")
    
    def __init__(self, id, name):
        self.id = id
        self.name = name