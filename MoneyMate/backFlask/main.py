from flask import Flask
from flask_jwt_extended import JWTManager
from dao.expense_type_dao import ExpenseType
from dao.expense_dao import Expense
from dao.user_dao import User
from envs.dev.dev_env import config, get_database_config
from database.db import init_app
from expense.routes.expense_route import expenses_routes
from expense_type.routes.expense_type_route import expenses_types_routes
from user.route.user_route import users_routes
from flask_cors import CORS

# Configurar el archivo app.py como el archivo principal de la aplicación
app  = Flask(__name__)

# Configurar Cors (Enlace cruzado de datos)
app.config['JSON_AS_ASCII'] = False
CORS(app)

# Configurar con que clave se firma el token jwt
app.config['JWT_SECRET_KEY'] = get_database_config().get('SECRET_KEY')
jwt = JWTManager(app)

# Configuración de los parámetros para la conexión con la base de datos
host = get_database_config().get('MYSQL_HOST')
user = get_database_config().get('MYSQL_USER')
password = get_database_config().get('MYSQL_PASSWORD')
database = get_database_config().get('DATABASE_NAME')
sql_track_modifications = get_database_config().get('SQLALCHEMY_TRACK_MODIFICATIONS')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://'+user+'@'+host+'/'+database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = sql_track_modifications # Esta configuración es opcional

# Creación en la base de datos en caso de ser necesario
init_app(app)

app.register_blueprint(users_routes)
app.register_blueprint(expenses_routes)
app.register_blueprint(expenses_types_routes)


if __name__ == "__main__":
    app.config.from_object(config["dev"])
    app.run()
