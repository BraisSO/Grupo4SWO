from database.db import db

class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(70), unique=True)
    first_name = db.Column(db.String(20), nullable=False)
    surname1 = db.Column(db.String(100), nullable=False)
    surname2 = db.Column(db.String(100), nullable=True)
    their_expenses = db.Relationship("Expense", backref="their_expenses")
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), unique=True)


    def __init__(self, id, username, email, first_name, surname1, surname2, password):
        self.id = id
        self.username = username
        self.first_name = first_name
        self.surname1 = surname1
        self.surname2 = surname2
        self.password = password
        self.email = email