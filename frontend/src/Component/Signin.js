import React, { useState } from 'react';
import axios from 'axios';
import "../App.css"
import {Link, useNavigate } from 'react-router-dom';

function Signin() {
    // State for form fields

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const sendData = () => {
        axios.post('http://localhost:3000/user/signin', {
           
            email: email,
            password: password
        })
        .then(response => {
            console.log("Success", response.data);
        })
        .catch(error => {
            console.log("There are some errors", error);
        });
    };
  
    const navigate=useNavigate();

    return (
        <div className='superDivSignup'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Sign In</h3>
                            {/* <form onSubmit={handleSubmit}> */}
                            <form>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        // value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        // value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-2" onClick={sendData}>Sign Up</button>
                            </form>
                            <p className="text-center mt-3">
                                Create an account<Link to="/"><small style={{cursor:"pointer"}}>Signup</small></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}    



export default Signin;
