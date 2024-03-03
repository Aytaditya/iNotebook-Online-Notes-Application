import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  //hardcording notes for sometime to develop frontend
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //get all notes
  
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
    
    const note=await response.json()
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
    const json =  response.json();
    console.log(json)

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }




//update a note
const editNote = async (id, title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTM3NmQ0ZTEzZTdmMmYxYjZjNDQ3In0sImlhdCI6MTcwODgwNDQ1M30.w7rpwvlYXZBUMroM1KPZjr6KpxiykKl9sGA5aPkpcGo"
       
      },
      body: JSON.stringify({ title, description, tag })
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.statusText}`);
    }

    // Wait for the request to complete before calling getNotes
    await response.json();
    
    // Now, you can call getNotes
    getNotes();
  } catch (error) {
    console.error('Error updating note:', error.message);
    // Handle error as needed
  }
};



  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
    </noteContext.Provider>

  )

}

export default NoteState;