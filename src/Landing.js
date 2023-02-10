import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import useToken from "./useToken";

export default function Landing({setToken}) {
    const [register, setRegister] = useState(false)

    function toggleRegister() {
        setRegister(!register)
    }

    return(
        register ?  <Register /> : <Login setToken={setToken} toggleRegister={toggleRegister} />
    )
}