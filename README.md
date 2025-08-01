# Notecraft

A Minecraft-themed notes app with a Flask backend and a SolidJS frontend. Enjoy a playful, professional note-taking experience inspired by the iconic Minecraft aesthetic, complete with animated sunrise loading screens, pixel-art walkers, and a vibrant UI.

## Features
- Minecraft-inspired theme and layout
- Animated sunrise loading screen
- Pixel-art Minecraft walkers and fire icons
- Create, view, and delete notes
- Responsive and modern design

## Tech Stack
- **Frontend:** SolidJS, Vite, CSS, SVG
- **Backend:** Flask, Python, SQLAlchemy

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/catmoreak/Notecraft.git
cd Notecraft
```

### 2. Backend Setup
```
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
The backend will run on `http://localhost:5000` by default.

### 3. Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173` by default.

## Deployment

### Deploy Backend (Flask) on Render
- Push your code to GitHub.
- Create a new Web Service on [Render](https://render.com/), set root to `backend`, build command: `pip install -r requirements.txt`, start command: `python app.py`.
- Enable CORS in `app.py`:
  ```python
  from flask_cors import CORS
  CORS(app)
  ```

### Deploy Frontend (SolidJS) on Render
- Build the frontend:
  ```
  npm run build
  ```
- Deploy the `frontend/dist` folder as a Static Site on Render.
- Set the API URL in `frontend/src/App.jsx` to your backend’s Render URL .



---

Enjoy taking notes in Minecraft style!
