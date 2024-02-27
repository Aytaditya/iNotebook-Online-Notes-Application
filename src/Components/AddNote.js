import React, { useState ,useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote}=context;

  const [note, setNote] = useState({title:"",description:"",tag:"default"})

    const handleClick=(e)=>{
      e.preventDefault()
      addNote(note.title,note.description,note.tag);
    }

    const onChange=(e)=>{
      setNote({...note,[e.target.name]:[e.target.value]})
    }
  return (
   
    <div>
          <h2>Add A Note</h2>
      <div className="container my-3">
        <form className='my-1'>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label textbox">Description</label>
            <input type="text" className="form-control" id="desc" name="description" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-warning btn-sm" onClick={handleClick} >Submit</button>
          {/* <button className=" speakbtn" onClick={speak}>Submit</button> */}
        </form>
      </div>
    </div>
  )
}

export default AddNote
