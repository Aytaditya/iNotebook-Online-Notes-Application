import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect } from 'react';

export default function Notes() {
  // Assuming noteContext provides a notes array
  const { notes,getNotes } = useContext(noteContext);
  
  useEffect(() => {
      getNotes()
  }, [])

  return (
    <div>
      <AddNote />
      <div className="row my-3">
        <h2 className="colorchange1">Your Notes</h2>
        {notes.map((note) => (
          <Noteitem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
