import React, { useState } from 'react';
import './Register.css'



function Register() {
    const [registered, setRegistered] = useState(false);
    const [registration_key, setRegistrationKey] = useState();
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const registerUser = async function(registration_key) {
        const userdata = await fetch('https://slugga-api.onrender.com/register',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration_key)
        }).then((response) => response.json())
        setUser(userdata)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const user = registerUser({
            regKey: registration_key,
            password: password
        })
        setRegistered(true)
    }

    if (!registered) {
        return(
            <div className={'registration-wrapper'}>
                <form onSubmit={handleSubmit}>
                    <input type={'text'} onChange={e => setRegistrationKey(e.target.value)} placeholder={'Registration Key'}/>
                    <input type={'text'} onChange={e => setPassword(e.target.value)} placeholder={'Password'} />
                    <button type={'submit'}>Register</button>
                </form>
            </div>
        )
    }
}

export default Register