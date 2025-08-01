from flask import Blueprint, request, jsonify
from db import SessionLocal
from models import Note

routes = Blueprint('routes', __name__)

@routes.route("/notes", methods=["GET"])
def get_notes():
    db = SessionLocal()
    try:
        notes = db.query(Note).all()
        return jsonify([{
            "id": n.id,
            "title": n.title,
            "content": n.content,
            "created_at": str(n.created_at)
        } for n in notes])
    finally:
        db.close()


@routes.route("/notes", methods=["POST"])
def add_note():
    data = request.json
    db = SessionLocal()
    try:
        note = Note(title=data["title"], content=data["content"])
        db.add(note)
        db.commit()
        return jsonify({"message": "Note added", "id": note.id})
    finally:
        db.close()


# DELETE endpoint for deleting a note by id
@routes.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == note_id).first()
        if note:
            db.delete(note)
            db.commit()
            return jsonify({"message": "Note deleted"})
        else:
            return jsonify({"error": "Note not found"}), 404
    finally:
        db.close()
