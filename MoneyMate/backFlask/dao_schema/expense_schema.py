from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow()

class ExpenseSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    amount = fields.Float()
    date = fields.String()
    expense_type_id = fields.Integer()
    user_id = fields.Integer()