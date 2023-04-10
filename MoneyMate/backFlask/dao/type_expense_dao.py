from database.db import db

class TypeExpense(db.Model):
    __tablename__="types_expenses"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    
    def __init__(self, id, name):
        self.id = id
        self.name = name