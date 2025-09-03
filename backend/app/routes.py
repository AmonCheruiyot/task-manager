import re
from datetime import datetime
from flask import Blueprint, request, jsonify
from .extensions import db
from .models import Task, STATUS_VALUES

api_blueprint = Blueprint('api', __name__, url_prefix='/api')

# -------- Validation helpers (moved from original app.py) --------
iso_date_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")

def validate_payload(data, partial=False):
    errors = []
    if not partial:
        if not data.get("title"):
            errors.append("title is required")
    if "title" in data:
        t = data.get("title", "").strip()
        if not (1 <= len(t) <= 120):
            errors.append("title length must be 1..120")
    if "description" in data and data["description"] is not None:
        if len(data["description"]) > 500:
            errors.append("description max length is 500")
    if "status" in data and data["status"] not in STATUS_VALUES:
        errors.append(f"status must be one of {list(STATUS_VALUES)}")
    if "due_date" in data and data["due_date"]:
        if not iso_date_re.match(data["due_date"]):
            errors.append("due_date must be ISO date (YYYY-MM-DD)")
    return errors

# -------- Routes (now on the blueprint) --------

@api_blueprint.get("/tasks")
def list_tasks():
    tasks = db.session.query(Task).order_by(Task.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tasks]), 200

@api_blueprint.get("/tasks/<int:task_id>")
def get_task(task_id):
    # Use modern db.session.get() instead of Task.query.get()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "Not found"}), 404
    return jsonify(task.to_dict()), 200

@api_blueprint.post("/tasks")
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

@api_blueprint.put("/tasks/<int:task_id>")
def update_task(task_id):
    # Use modern db.session.get() instead of Task.query.get()
    task = db.session.get(Task, task_id)
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

@api_blueprint.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    # Use modern db.session.get() instead of Task.query.get()
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return "", 204
