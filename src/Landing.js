import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import useToken from "./useToken";

export default function Landing() {
    const [register, setRegister] = useState(false)
    const {token, setToken} = useToken()

    function toggleRegister() {
        setRegister(!register)
    }
    if(!token) {
        return (
            register ? <Register/> : <Login setToken={setToken} toggleRegister={toggleRegister}/>
        )
    }
}