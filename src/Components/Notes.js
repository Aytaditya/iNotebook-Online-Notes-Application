import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect, useRef, useState } from 'react';

const Notes = () => {

  useEffect(() => {
    getNotes()
    //eslint-disable-next-line
  }, [])

  // Assuming noteContext provides a notes array
  const { notes, getNotes, editNote } = useContext(noteContext);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    setNote({ id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description })
    ref.current.click()

  }


  const handleClick = (e) => {
    console.log('Clicked Update Note');
  
    if (note.id && note.etitle && note.edescription && note.etag) {
      console.log('Updating note:', note);
      editNote(note.id, note.etitle, note.edescription, note.etag);
      console.log('Edit note function called');
      refClose.current.click();
    } else {
      console.error('One or more values are undefined.');
    }
  };
  




  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
      <div className="noChange12">
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container my-3">
                  <form className='my-1'>
                    <div className="mb-3">
                      <label htmlFor="Title" className="form-label"> Give a Title to Your Note</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label textbox"> Add Tag for Your Note</label>
                      <input type="text" className="form-control etag" id="etag" name="etag" onChange={onChange} value={note.etag} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label textbox">Description</label>
                      <input type="text" className="form-control edescription" id="edesc" name="edescription" onChange={onChange} value={note.edescription} />
                    </div>

                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={handleClick}>Update Note</button>
            </div>

          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1 className="colorchange1 my-4 editH1">Your Notes</h1>
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} updateNote={updateNote} />
        ))}

      </div>
    </>
  );
}

export default Notes