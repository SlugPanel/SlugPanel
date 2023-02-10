import React, {useEffect, useState} from 'react';
import './Login.css';
import PropTypes from "prop-types";
import '../Register/Register'

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

export default function Login({setToken, toggleRegister}){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        setToken(response['token']);
        setUser(response['user'])
    }
    return (
        <div className="login-wrapper">
            <h1>SlugPanel</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type={"text"} onChange={e => setUserName(e.target.value)} placeholder={"Username"} />
                <input type={"password"} onChange={e => setPassword(e.target.value)} placeholder={"Password"} />
                <button type={"submit"}>Login</button>
            </form>
            <button type={"submit"} onClick={toggleRegister}>Register</button>
        </div>
    );
}



Login.propTypes = {
    setToken: PropTypes.func.isRequired
}