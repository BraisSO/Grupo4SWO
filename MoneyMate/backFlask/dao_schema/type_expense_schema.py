from marshmallow import Schema, fields

from dao_schema.expense_schema import ExpenseSchema


class TypeExpenseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    expenses = fields.Nested(ExpenseSchema, many=True)