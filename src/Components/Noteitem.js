import React, { useContext } from 'react';
import './Noteitem.css';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-2 customTry ">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash fa-lg mx-3" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square fa-lg mx-3" key={note._id} onClick={()=>{updateNote(note)}} ></i>
                    </div>
                    <div className='my-3'>
                        <p className="card-text font1">{note.description}</p>
                        <p className="card-text my-3 circle1"># {note.tag}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Noteitem;
