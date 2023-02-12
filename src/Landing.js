import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";

export default function Landing() {
    const [register, setRegister] = useState(false)

    function toggleRegister() {
        setRegister(!register)
    }

    if(!register) {
        return (
            <Login toggleRegister={toggleRegister} />
        )
    } else {
        return (
            <Register />
        )
    }
}