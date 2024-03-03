import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [modalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
    
    //eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      etag: currentNote.tag,
      edescription: currentNote.description
    });
    // Update the state to open the modal
    setModalOpen(true);
  };

  const handleClick = (e) => {
    if (note.id && note.etitle && note.edescription && note.etag) {
      editNote(note.id, note.etitle, note.edescription, note.etag);
      setModalOpen(false); // Close the modal after updating
    } 
    else {
      console.error('One or more values are undefined.');
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h1 className="colorchange1 my-4 editH1">Your Added Notes</h1>
        {notes.length === 0 && 'No Notes to display'}
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>

     
      <div className={`modal fade${modalOpen ? ' show' : ''} colorConstant`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
              <button type="button" className="btn-close" onClick={() => setModalOpen(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form className='my-1'>
                  <div className="mb-3">
                    <label htmlFor="Title" className="form-label"> Give a Title to Your Note</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required />
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
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={() => setModalOpen(false)}>Close</button>
              <button type="button" className="btn btn-success" onClick={handleClick} disabled={note.etitle.length === 0 || note.edescription.length === 0}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;