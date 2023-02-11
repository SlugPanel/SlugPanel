import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";

export default function Landing({token, setToken}) {
    const [register, setRegister] = useState(false)

    function toggleRegister() {
        setRegister(!register)
    }
    if(!token) {
        return (
            register ? <Register/> : <Login toggleRegister={toggleRegister} />
        )
    }
}