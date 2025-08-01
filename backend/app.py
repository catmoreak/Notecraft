from flask import Flask
from flask_cors import CORS
from db import Base, engine
from note_routes import routes

app = Flask(__name__)
CORS(app)

Base.metadata.create_all(bind=engine)

app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)
