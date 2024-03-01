import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect, useRef, useState } from 'react';

export default function Notes() {
  // Assuming noteContext provides a notes array
  const { notes, getNotes } = useContext(noteContext);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  useEffect(() => {
    getNotes()
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id:currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description })

  }
  const ref = useRef(null)
  const refClose = useRef(null)
  const handleClick = (e) => {
    e.preventDefault()
    refClose.current.click();

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] })
  }

  return (
    <>
      <AddNote />
      <div className="noChange12">
        <button type="button" class="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div className="container my-3">
                  <form className='my-1'>
                    <div className="mb-3">
                      <label htmlFor="Title" className="form-label"> Give a Title to Your Note</label>
                      <input type="text" className="form-control" id="etitle" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
                    </div>
                    <div className="mb-3">
                      <label for="tag" className="form-label textbox"> Add Tag for Your Note</label>
                      <input type="text" className="form-control etag" id="etag" name="tag" onChange={onChange} value={note.etag}/>
                    </div>
                    <div className="mb-3">
                      <label for="description" className="form-label textbox">Description</label>
                      <input type="text" className="form-control edescription" id="edesc" name="description" onChange={onChange} value={note.edescription} />
                      </div>

                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" ref={refClose} class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success" onClick={handleClick}>Update Note</button>
            </div>

          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1 className="colorchange1 my-4 editH1">Your Notes</h1>
        {notes.map((note) => (
          <Noteitem key={note.id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
}
