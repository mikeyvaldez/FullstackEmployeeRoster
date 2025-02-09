# This file needs to be updated before deployment
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app, origins=["https://e-roster.netlify.app"])

#sqlite for development, postgres for production
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')  # PostgreSQL connection URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Avoid overhead of tracking modifications
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Use environment variable for secret key
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # Use environment variable for JWT secret

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

if __name__ == "__main__":
    app.run(debug=True)