from marshmallow import fields, Schema


class ExpenseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    amount = fields.Float()
    date = fields.Float()