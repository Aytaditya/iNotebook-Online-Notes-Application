import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name:"",email:"",password:""})

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {name,email,password}=credentials
    const response=await fetch('http://localhost:5000/api/auth/createuser',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({name,email,password})
    })
    const json=await response.json();
    console.log(json) 
    if(json.success){
      localStorage.setItem('token',json.authToken)
      navigate("/");
      props.showAlert("Account Created Successfully","success")
    }
    else{
      props.showAlert("User Already exists","danger")
    }

    

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='mt-0 of1'>
      {/* onSubmit is applied on form not on button */}
      <form className='borderC2' onSubmit={handleSubmit}>
        <div className="mb-3 col-md-4 mx-auto mt-5 containerShift1">
          <h3 className='my-4'>Sign Up Now </h3>
          <label htmlFor="name" className="form-label"><i class="fa-solid fa-user"></i> Enter your Name</label>
          <input type="name" name="name" className="form-control" id="name" onChange={onChange} />
        </div>
        <div className="mb-3 col-md-4 mx-auto">
          <label htmlFor="email" className="form-label mx-2"><i class="fa-solid fa-envelope"></i> Enter your Email address</label>
          <input type="email" name="email" className="form-control" id="email" onChange={onChange} />
        </div>
        <div className="mb-3 col-md-4 mx-auto">
          <label htmlFor="password" className="form-label mx-2"><i class="fa-solid fa-key"></i> Choose a Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={onChange} required minLength={5} />
        </div>
       

        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <button type="submit" className="btn btn-outline-dark my-5">Create my account</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
