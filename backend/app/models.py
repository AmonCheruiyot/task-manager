from datetime import datetime
from .extensions import db  # Use relative import from extensions

STATUS_VALUES = ("todo", "in_progress", "done")

class Task(db.Model):
    __tablename__ = "tasks"
    # ... your existing Task model code ...
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500))
    status = db.Column(db.String(20), default="todo", nullable=False)
    due_date = db.Column(db.String(25))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description or "",
            "status": self.status,
            "due_date": self.due_date or None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
