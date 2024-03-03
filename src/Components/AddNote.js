import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default tag" })

  const speak = () => {
    //function applied on id
    let synth = window.speechSynthesis;
    let passwordValue = document.getElementById("desc").value
    let voice = new SpeechSynthesisUtterance(`${passwordValue}`)
    synth.speak(voice)
  }

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default tag" })
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <div>
      <h2 className='editH my-4'>Add a Note to your iNotebook</h2>
      <div className=" my-3">
        <form className='my-1'>
          <div className="d-flex">
            <div className="mb-3 mr-3 ">
              <label htmlFor="Title" className="form-label"> Give a Title to Your Note</label>
              <input type="text col-xs-5" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} title="Add a Title to your note" />
            </div>
            <div className="mb-3 mx-4">
              <label htmlFor="tag" className="form-label textbox"> Add Tag for Your Note</label>
              <input type="text col-xs-3" className="form-control tag" id="tag" name="tag" onChange={onChange} value={note.tag} title="Add Tag to your note" />
            </div>
          </div>

          <div className="mb-3 my-2">
            <label htmlFor="description" className="form-label textbox input-lg">Description</label>
            <input type="text" className="form-control description my-3" id="desc" name="description" onChange={onChange} value={note.description} title="Give a Description to your note" />
          </div>
          <button type="submit" className="btn btn-primary  my-3" onClick={handleClick} disabled={note.title.length <5 || note.description.length<5}

          >Add a Note</button>
          <button type="button" className="btn btn-outline-danger  speakbtn mx-3" onClick={speak}>Hear Your Description</button>
          {/* <button className=" speakbtn" onClick={speak}>Submit</button> */}
        </form>
      </div>

    </div>
  )
}

export default AddNote
