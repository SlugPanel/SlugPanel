import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import useToken from "./useToken";

export default function Landing() {
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