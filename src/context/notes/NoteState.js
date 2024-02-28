import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  //hardcording notes for sometime to develop frontend
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //get all notes
  //Add a note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTM3NmQ0ZTEzZTdmMmYxYjZjNDQ3In0sImlhdCI6MTcwODgwNDQ1M30.w7rpwvlYXZBUMroM1KPZjr6KpxiykKl9sGA5aPkpcGo"
      },

    });
    const json = await response.json()
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //we have to make sure string is going in as input otherwise it will assume as array and it will consider as array and internal server error will come
    title = String(title);
  description = String(description);
  tag = String(tag);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTM3NmQ0ZTEzZTdmMmYxYjZjNDQ3In0sImlhdCI6MTcwODgwNDQ1M30.w7rpwvlYXZBUMroM1KPZjr6KpxiykKl9sGA5aPkpcGo"
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = {
      "_id": "65db94197aed04b5cef7471f248",
      "user": "65da376d4e13e7f2f1b6c447",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-02-25T19:25:13.468Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
    
  }


  //delete a note
  const deleteNote = async (id) =>{

    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTM3NmQ0ZTEzZTdmMmYxYjZjNDQ3In0sImlhdCI6MTcwODgwNDQ1M30.w7rpwvlYXZBUMroM1KPZjr6KpxiykKl9sGA5aPkpcGo"
      },
     
    });
    const json = response.json();

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  //update a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTM3NmQ0ZTEzZTdmMmYxYjZjNDQ3In0sImlhdCI6MTcwODgwNDQ1M30.w7rpwvlYXZBUMroM1KPZjr6KpxiykKl9sGA5aPkpcGo"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i]
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.title = title;
      }

    }
  }


  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>

  )

}

export default NoteState;