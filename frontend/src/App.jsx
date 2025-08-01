
/* @jsxImportSource solid-js */

import { createSignal, createResource, For } from 'solid-js';
import './minecraft-theme.css';
import MinecraftWalkers from './MinecraftWalkers.jsx';
import LoadingSunrise from './LoadingSunrise.jsx';

const API_URL = 'https://backend-notecraft.onrender.com/notes';

async function fetchNotes() {
  const res = await fetch(API_URL);
  return res.json();
}


function App() {
  const [notes, { refetch }] = createResource(fetchNotes);
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [loading, setLoading] = createSignal(true);

  const addNote = async (e) => {
    e.preventDefault();
    if (!title().trim() || !content().trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title(), content: content() })
    });
    setTitle("");
    setContent("");
    refetch();
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    refetch();
  };

  // Hide main content while loading
  return (
    <>
      <LoadingSunrise onFinish={() => setLoading(false)} />
      {!loading() && (
        <>
          <div class="app-mc">
            <h1>Notecraft</h1>
            <form onSubmit={addNote} style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem', 'margin-bottom': '1rem' }}>
              <input
                value={title()}
                onInput={e => setTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                value={content()}
                onInput={e => setContent(e.target.value)}
                placeholder="Content"
              />
              <button type="submit" style={{ alignSelf: 'flex-end' }}>Add</button>
            </form>
            <ul>
              <For each={notes()}>{note => (
                <li class="note-mc">
                  <div class="note-avatar" style={{
                    width: '32px', height: '32px', marginRight: '0.75rem', display: 'inline-block', verticalAlign: 'middle', background: 'none',
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain',
                  }}>
                    <svg viewBox="0 0 32 32" width="32" height="32" style={{ display: 'block' }}>
                      <g>
                        <path d="M16 2c0 4-3 7-3 11 0 2 1 3 3 3s3-1 3-3c0-4-3-7-3-11z" fill="#ff9800"/>
                        <path d="M16 8c0 2-2 4-2 6 0 1 1 2 2 2s2-1 2-2c0-2-2-4-2-6z" fill="#ffd740"/>
                        <path d="M16 14c-4 0-7 3-7 7 0 4 3 7 7 7s7-3 7-7c0-4-3-7-7-7z" fill="#ffb300"/>
                        <path d="M16 18c-2 0-4 2-4 4 0 2 2 4 4 4s4-2 4-4c0-2-2-4-4-4z" fill="#fff176"/>
                        <path d="M16 22c-1 0-2 1-2 2 0 1 1 2 2 2s2-1 2-2c0-1-1-2-2-2z" fill="#fffde7"/>
                      </g>
                    </svg>
                  </div>
                  <strong>{note.title}</strong>
                  <span>{note.content}</span>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </li>
              )}</For>
            </ul>
          </div>
          <MinecraftWalkers />
        </>
      )}
    </>
  );
}

export default App;
