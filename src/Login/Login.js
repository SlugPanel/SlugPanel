import React, {useState} from 'react';
import './Login.css';
import PropTypes from "prop-types";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({setToken}){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div className="login-wrapper">
            <h1>SlugPanel</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type={"text"} onChange={e => setUserName(e.target.value)} placeholder={"Username"} />
                <input type={"password"} onChange={e => setPassword(e.target.value)} placeholder={"Password"} />
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}