from flask_marshmallow import Marshmallow
from marshmallow import fields
from dao_schema.expense_schema import ExpenseSchema

ma = Marshmallow()

class TypeExpenseSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    expenses = fields.Nested(ExpenseSchema, many=True)