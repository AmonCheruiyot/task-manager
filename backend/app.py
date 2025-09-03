import os
import re
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

from models import db, Task, STATUS_VALUES

load_dotenv()

def create_app():
    app = Flask(__name__)

    db_url = os.getenv("DATABASE_URL", "sqlite:///tasks.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # CORS for local dev (adjust origins as needed)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

    db.init_app(app)

    with app.app_context():
        db.create_all()

    # -------- Validation helpers --------
    iso_date_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")

    def validate_payload(data, partial=False):
        errors = []

        # title
        if not partial:
            if not data.get("title"):
                errors.append("title is required")
        if "title" in data:
            t = data.get("title", "").strip()
            if not (1 <= len(t) <= 120):
                errors.append("title length must be 1..120")
        # description
        if "description" in data and data["description"] is not None:
            if len(data["description"]) > 500:
                errors.append("description max length is 500")
        # status
        if "status" in data and data["status"] not in STATUS_VALUES:
            errors.append(f"status must be one of {list(STATUS_VALUES)}")
        # due_date
        if "due_date" in data and data["due_date"]:
            if not iso_date_re.match(data["due_date"]):
                errors.append("due_date must be ISO date (YYYY-MM-DD)")

        return errors

    # -------- Routes --------

    @app.get("/api/tasks")
    def list_tasks():
        tasks = Task.query.order_by(Task.created_at.desc()).all()
        return jsonify([t.to_dict() for t in tasks]), 200

    @app.get("/api/tasks/<int:task_id>")
    def get_task(task_id):
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Not found"}), 404
        return jsonify(task.to_dict()), 200

    @app.post("/api/tasks")
    def create_task():
        data = request.get_json(force=True, silent=True) or {}
        errors = validate_payload(data, partial=False)
        if errors:
            return jsonify({"errors": errors}), 400

        task = Task(
            title=data["title"].strip(),
            description=(data.get("description") or "").strip() or None,
            status=data.get("status") or "todo",
            due_date=data.get("due_date") or None,
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

    @app.put("/api/tasks/<int:task_id>")
    def update_task(task_id):
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Not found"}), 404

        data = request.get_json(force=True, silent=True) or {}
        errors = validate_payload(data, partial=True)
        if errors:
            return jsonify({"errors": errors}), 400

        if "title" in data:
            task.title = data["title"].strip()
        if "description" in data:
            desc = (data["description"] or "").strip()
            task.description = desc or None
        if "status" in data:
            task.status = data["status"]
        if "due_date" in data:
            task.due_date = data["due_date"] or None
        task.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify(task.to_dict()), 200

    @app.delete("/api/tasks/<int:task_id>")
    def delete_task(task_id):
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Not found"}), 404
        db.session.delete(task)
        db.session.commit()
        return "", 204

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
