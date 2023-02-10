import React, {useState} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import useToken from "./useToken";
import useUser from "./useUser";

export default function Landing() {
    const [register, setRegister] = useState(false)
    const {token, setToken} = useToken();
    const {user, setUser} = useUser();

    function toggleRegister() {
        setRegister(!register)
    }
    if(!token) {
        return (
            register ? <Register/> : <Login setToken={setToken} toggleRegister={toggleRegister} setUser={setUser}/>
        )
    }
}