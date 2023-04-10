from flask import Flask
from envs.dev.dev_env import config, get_database_config
from database.db import init_app
from expense.routes.expense_route import expenses_routes
from type_expense.routes.type_expense_route import types_expenses_routes
from flask_cors import CORS

# Configurar el archivo app.py como el archivo principal de la aplicación
app  = Flask(__name__)

# Configurar Cors (Enlace cruzado de datos)
app.config['JSON_AS_ASCII'] = False
CORS(app)

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


app.register_blueprint(expenses_routes)
app.register_blueprint(types_expenses_routes)


if __name__ == "__main__":
    app.config.from_object(config["dev"])
    app.run()
