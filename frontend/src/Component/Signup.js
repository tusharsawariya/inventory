import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

function Signup() {
    // State for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Navigation hook
    const navigate = useNavigate();

    // Function to handle form submission
    const sendData = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        axios.post('http://localhost:3000/user/signup', {
            username: username,
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

    return (
        <div className='superDivSignup'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h3 className="card-title text-center">Sign Up</h3>
                                <form onSubmit={sendData}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mt-2" onClick={sendData}>
                                        Sign Up
                                    </button>
                                </form>
                                <p className="text-center mt-3" >
                                    Already have an account? <Link to="/signin"><small style={{cursor:"pointer"}}>Signup</small></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
