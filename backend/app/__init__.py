import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from .extensions import db
from .routes import api_blueprint

load_dotenv()

def create_app():
    app = Flask(__name__)

    db_url = os.getenv("DATABASE_URL", "sqlite:///tasks.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(api_blueprint)

    return app
