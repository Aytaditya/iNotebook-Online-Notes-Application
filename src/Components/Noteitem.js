import React from 'react'
import './Noteitem.css';

const Noteitem = (props) => {
    const { note } = props
    return (
        <div className='col-md-3'>

            <div class="card my-2 customTry">           
                    <div class="card-body">
                        <h5 class="card-title">Title: {note.title}</h5>
                        <p class="card-text">{note.description}</p>
                        <p class="card-text"># {note.tag}</p>
                        
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
