import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    //hardcording notes for sometime to develop frontend
    const notesInitial=
        [
            {
              "_id": "65dafc0f5b604b3b5c043183",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "my first test",
              "description": "this is a desciption",
              "tag": "personal",
              "date": "2024-02-25T08:36:31.894Z",
              "__v": 0
            },
            {
              "_id": "65db032f5b604b3b5c04318a",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "Verifying if added",
              "description": "First MERN project",
              "tag": "personal",
              "date": "2024-02-25T09:06:55.387Z",
              "__v": 0
            },
            {
              "_id": "65db1b5f8a1651f68845e599",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "bhai error aarha hain bhot zor se",
              "description": " bhai error kyu aarha hain",
              "tag": "personal",
              "date": "2024-02-25T10:50:07.775Z",
              "__v": 0
            },
            {
              "_id": "65db38e1e1a271ec06cb9510",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "hi i am satyam pandey",
              "description": " i am messi fan",
              "tag": "personal",
              "date": "2024-02-25T12:56:01.377Z",
              "__v": 0
            },
            {
              "_id": "65db45b1e1a271ec06cb9517",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "hi i priyaam ",
              "description": " i am making insta clone",
              "tag": "personal",
              "date": "2024-02-25T13:50:41.226Z",
              "__v": 0
            },
            {
              "_id": "65db4bee5006bee7ca4d6715",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "hi i am aadyamani bhatanagar",
              "description": " i am a teacher",
              "tag": "personal",
              "date": "2024-02-25T14:17:18.777Z",
              "__v": 0
            },
            {
              "_id": "65db8d15745a7591add10056",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "hi i am adding this note to delete it",
              "description": "electrical engineer",
              "tag": "personal",
              "date": "2024-02-25T18:55:17.526Z",
              "__v": 0
            },
            {
              "_id": "65db94197aed04b5cef1f248",
              "user": "65da376d4e13e7f2f1b6c447",
              "title": "this is my project",
              "description": "i love my project ",
              "tag": "personal",
              "date": "2024-02-25T19:25:13.468Z",
              "__v": 0
            }
          ]
           
           
          
    
    const [notes, setNotes] = useState(notesInitial)
    return(
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>

    )

}

export default NoteState;