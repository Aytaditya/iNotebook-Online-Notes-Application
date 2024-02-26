import React from 'react'
import Notes from './Notes'



export default function Home() {
   
  return (
    <div>
      <h2>Add A Note</h2>
      <div className="container my-3">
        <form className='my-1'>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      <Notes/>

    </div>
  )
}
