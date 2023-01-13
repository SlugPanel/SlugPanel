import React from 'react';
import './Login.css';
import PropTypes from "prop-types";

export default class Login extends React.Component {
    constructor(props, { setToken }) {
        super(props);
        setToken = PropTypes.func.isRequired;
    }

    async loginUser(credentials) {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    }

    render() {
        return (
            <div className="login-wrapper">
                <h1>SlugPanel</h1>
                <h2>Login</h2>
                <form className="login-form">
                    <input type={"text"} placeholder={"Username"} />
                    <input type={"password"} placeholder={"Password"} />
                    <button type={"submit"}>Login</button>
                </form>
            </div>
        );
    }
}