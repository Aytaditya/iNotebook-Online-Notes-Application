import React from 'react'
import './Noteitem.css';

const Noteitem = (props) => {
    const { note } = props
    return (
        <div className='col-md-3'>

            <div class="card my-2 customTry ">           
                    <div class="card-body">
                        <div className="d-flex align-items-center">
                        <h5 class="card-title">{note.title}</h5>
                        <i class="fa-solid fa-trash fa-lg mx-3"></i>
                        <i class="fa-solid fa-pen-to-square  fa-lg mx-3"></i>
                        </div>
                        <div className='my-3'>
                        <p class="card-text font1">{note.description}</p>
                        <p class="card-text  my-3 circle1"># {note.tag}</p>
                        </div>
                       
                        
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
