import React from 'react';

function Login() {
    return (
        <div className='mt-0'>
            <form className='borderC'>
                <div className="mb-3 col-md-4 mx-auto mt-5">
                    <h3 className='my-4 mx-5'>Login into your Account</h3>
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3 col-md-4 mx-auto">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                
                <div className="row">
                    <div className="col-md-6 mx-auto text-center">
                        <button type="submit" className="btn btn-primary my-3">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
