import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      title = String(title);
      description = String(description);
      tag = String(tag);

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.statusText}`);
      }

      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }

      const json = await response.json();
      console.log(json);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      await response.json();
      getNotes();  
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  };

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
