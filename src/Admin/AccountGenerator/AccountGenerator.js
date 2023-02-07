import React, {useState} from 'react';
import {json} from "react-router-dom";
import './AccountGenerator.css'

async function generateRegistrationKey(formData) {
    return fetch('http://localhost:8080/generate', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then (data => data.json())
}

export default function AccountGenerator() {
    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [discord_id, setDiscordId] = useState();
    const [rank, setRank] = useState();
    const [authentication_level, setAuthenticationLevel] = useState("Administration");

    const handleSubmit = async e => {
        e.preventDefault()
        const registrationKey = generateRegistrationKey({
            username,
            discord_id,
            rank,
            authentication_level
        });
    }

    let generated = false;

    if (!generated) {
        return (
            <div>
                <h1>Account Generator</h1>
                <div className={"account-generator-form"}>
                    <form onSubmit={handleSubmit}>
                        <input type={"text"} placeholder={"Username"} onChange={e => setUsername(e.target.value)}/>
                        <input type={"number"} placeholder={"Discord ID"} onChange={e => setDiscordId(e.target.value)}/>
                        <input type={"text"} placeholder={"Rank"} onChange={e => setRank(e.target.value)}/>
                        <select onChange={e => setAuthenticationLevel(e.target.value)}>
                            <option value={"Administration"}>Administration</option>
                            <option value={"Headquarters"}>Headquarters</option>
                            <option value={"Division Staff"}>Division Staff</option>
                        </select>
                        <button type={"submit"}>Generate Key</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Account Generator</h1>
                <div className={'key-output'}>
                    <h4>Registration key: <div className={'key'}>{}</div></h4>
                </div>
            </div>
        );
    }
}