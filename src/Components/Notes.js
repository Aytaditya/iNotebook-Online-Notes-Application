import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

export default function Notes() {
  // Assuming noteContext provides a notes array
  const { notes } = useContext(noteContext);

  return (
    <div>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <Noteitem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
