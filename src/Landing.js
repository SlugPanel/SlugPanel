import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import {Navigate} from "react-router-dom";

export default function Landing() {
    const [register, setRegister] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);

    function toggleRegister() {
        setRegister(!register)
    }

    if(!register) {
        return (
            register ? <Register/> : <Login toggleRegister={toggleRegister} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        )
    }
    if (loggedIn) {
        return <Navigate replace to={'/'} />
    }
}