from flask import Blueprint, request, jsonify
from db import SessionLocal
from models import Note

routes = Blueprint('routes', __name__)

@routes.route("/notes", methods=["GET"])
def get_notes():
    db = SessionLocal()
    notes = db.query(Note).all()
    return jsonify([{
        "id": n.id,
        "title": n.title,
        "content": n.content,
        "created_at": str(n.created_at)
    } for n in notes])

@routes.route("/notes", methods=["POST"])
def add_note():
    data = request.json
    db = SessionLocal()
    note = Note(title=data["title"], content=data["content"])
    db.add(note)
    db.commit()
    return jsonify({"message": "Note added", "id": note.id})
