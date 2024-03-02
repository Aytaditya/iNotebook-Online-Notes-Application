import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState} from 'react';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';




function App() {
  const [mode, setMode] = useState('white');
  

  // DARK MODE/ LIGHT MODE
  const changeMode = () => {
    const remove1 = Array.from(document.querySelectorAll('.fa-moon'));
    const remove2 = Array.from(document.querySelectorAll('.fa-sun'));
    if (mode === 'white') {
      setMode('black');
      document.body.style.backgroundColor = 'rgb(33, 37, 41)';
      document.body.style.color = 'white';

      remove1.forEach(element => {
        element.classList.remove('fa-moon');
        element.classList.add('fa-sun');
      });
    } else {
      setMode('white');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';

      remove2.forEach(element => {
        element.classList.remove('fa-sun');
        element.classList.add('fa-moon');
      });
    }
  };

  return (
    <>
      <NoteState>
        <Router>      
       
          <Navbar changeMode={changeMode} />
           <Alert message="Your note has been deleted "/> 
          
          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home  />} />
              <Route exact path="/about" element={<About  />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
