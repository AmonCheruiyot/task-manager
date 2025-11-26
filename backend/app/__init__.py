import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from .extensions import db
from .routes import api_blueprint

def create_app():
    load_dotenv()
    app = Flask(__name__)
    
    # Production database configuration
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        # Handle postgres:// → postgresql:// for SQLAlchemy 1.4+
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/tasks.db'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

    db.init_app(app)

    with app.app_context():
        db.create_all()

    # ✅ Add this endpoint so Render doesn't give 404
    @app.route("/")
    def index():
        return {"message": "Flask backend running successfully on Render!"}

    app.register_blueprint(api_blueprint)

    return app
