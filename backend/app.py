# This file needs to be updated before deployment

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")

app.config["SQLACHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(), "..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Server static files from the "dist" folder under the frontend directory
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder,filename)


# api routes
import routes

with app.app_context():
    db.create_all()


# This will only run if the file is ran directly(./app.py)
# so anything imported from db.py will not run
if __name__ == "__main__": # needs to evaluate to true in order to run
    app.run(debug=True)
