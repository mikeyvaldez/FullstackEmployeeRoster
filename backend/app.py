from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///people.db"
app.config["SQLACHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()


# This will only run if the file is ran directly(./app.py)
# so anything imported from db.py will not run
if __name__ == "__main__": # needs to evaluate to true in order to run
    app.run(debug=True)
