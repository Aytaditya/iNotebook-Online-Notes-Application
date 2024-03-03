import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    let navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><i className="fa-regular fa-comment"></i> iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className="nav-link active active1" aria-current="page" to="/"><i className="fa-solid fa-house " ></i> Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active active1" to="/about"><i className="fa-solid fa-address-card"></i>  About Us</Link>
                        </li>
                        <li className="nav-item my-2 mx-2 increasing">
                             <i className="fa-solid fa-moon nav-link active fa-lg" onClick={props.changeMode}></i>
                        </li>
                        
                    </ul>

                    {!localStorage.getItem('token')?<form className="d-flex">
                    
                    <Link className="btn  btn-outline-light mx-1 " to="/login">Login</Link>
                        <Link className="btn  btn-outline-warning mx-1" to="/signup">Sign Up</Link>
                    </form>: <button className='btn btn-outline-warning mx-2'onClick={handleLogout}>Log out</button>}
                </div>
            </div>
        </nav>
    );
}
