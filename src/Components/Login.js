import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login=(props)=> {
    const [credentials, setCredentials] = useState({email:"",password:""})
    // for redirecting we eill use useHistory hook
    //. In newer versions of React Router (v6 and later), useHistory is replaced with useNavigate. hence we dont use useHistory() anymore
    let navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            //JSON.stringify: Converts a JavaScript object into a JSON string.
            // we are sending a JSON-serialized object in the request body when making an HTTP request. The object includes the properties email and password
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json()  
          console.log(json)
          if(json.success){
            //if success is true redirect the user
            // we will also save the auth-token in local storage
            localStorage.setItem('token',json.authToken)
            console.log(json.authToken)

            // history.push("/")
            navigate("/");
            props.showAlert("Logged In Sucessfully ","success")
          }
          else{
            props.showAlert("Invalid Credentials","warning")
          }
    }

    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    return (
        <div className='mt-0'>
            {/* //onSubmit is applied on form not on button */}
            <form className='borderC' onSubmit={handleSubmit}>
                <div className="mb-3 col-md-4 mx-auto mt-5 containerShift1">
                    <h3 className='my-3 mt-5 mx-5'><i class="fa-solid fa-person-walking"></i> Login into your Account</h3>
                    <label htmlFor="email" className="form-label"><i class="fa-solid fa-envelope"></i> Email Address</label>
                    <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3 col-md-4 mx-auto">
                    <label htmlFor="password" className="form-label"><i class="fa-solid fa-key"></i> Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" id="password"/>
                </div>
                
                <div className="row">
                    <div className="col-md-6 mx-auto text-center">
                        <button type="submit" className="btn btn-outline-primary my-3">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
