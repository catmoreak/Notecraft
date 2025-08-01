from flask import Blueprint, request, jsonify
from db import SessionLocal
from models import Note

routes = Blueprint('routes', __name__)

@routes.route("/notes", methods=["GET"])
def get_notes():
    """Get all notes."""
    db = SessionLocal()
    try:
        notes = db.query(Note).all()
        return jsonify([
            {
                "id": n.id,
                "title": n.title,
                "content": n.content,
                "created_at": str(n.created_at)
            } for n in notes
        ]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@routes.route("/notes", methods=["POST"])
def add_note():
    """Add a new note. Expects JSON with 'title' and 'content'."""
    data = request.json
    if not data or not data.get("title") or not data.get("content"):
        return jsonify({"error": "Title and content are required."}), 400
    db = SessionLocal()
    try:
        note = Note(title=data["title"], content=data["content"])
        db.add(note)
        db.commit()
        db.refresh(note)
        return jsonify({
            "message": "Note added",
            "note": {
                "id": note.id,
                "title": note.title,
                "content": note.content,
                "created_at": str(note.created_at)
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


# DELETE endpoint for deleting a note by id
@routes.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    """Delete a note by its ID."""
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == note_id).first()
        if note:
            db.delete(note)
            db.commit()
            return '', 204
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
