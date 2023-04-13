from flask_marshmallow import Marshmallow
from marshmallow import fields
from dao_schema.expense_schema import ExpenseSchema

ma = Marshmallow()

class UserSchema(ma.Schema):
    id = fields.Integer()
    username = fields.String()
    first_name = fields.String()
    surname1 = fields.String()
    surname2 = fields.String()
    password = fields.String()
    email = fields.String()
    expenses = fields.Nested(ExpenseSchema, many=True)