import React, {useState} from 'react';
import './Login.css';
import PropTypes from "prop-types";
import '../Register/Register'
import {Navigate} from "react-router-dom";


async function loginUser(credentials) {
    return fetch('https://slugga-api.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({toggleRegister}){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        sessionStorage.setItem('user', response['user'])
        sessionStorage.setItem('token', JSON.stringify(response['token']))
        setLoggedIn(true)
        window.location.reload(true)
    }
    if (!loggedIn) {
        return (
            <div className="login-wrapper">
                <h1>SlugPanel</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type={"text"} onChange={e => setUserName(e.target.value)} placeholder={"Username"}/>
                    <input type={"password"} onChange={e => setPassword(e.target.value)} placeholder={"Password"}/>
                    <button type={"submit"}>Login</button>
                </form>
                <button type={"submit"} onClick={toggleRegister}>Register</button>
            </div>
        );
    }
}



Login.propTypes = {
    setToken: PropTypes.func.isRequired
}