import React, {useState} from 'react';
import './AccountGenerator.css'

export default function AccountGenerator() {
    const [username, setUsername] = useState();
    const [discord_id, setDiscordId] = useState();
    const [rank, setRank] = useState();
    const [authentication_level, setAuthenticationLevel] = useState("Division Staff");
    const [registration_key, setRegistrationKey] = useState();
    const [generated, setGenerated] = useState()


    const generateRegistrationKey = async (formData) => {
        const response = await fetch('https://slug-panel-api.onrender.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json());
        setRegistrationKey(response)
    }


    const handleSubmit = async e => {
        e.preventDefault()
        const registrationKey = generateRegistrationKey({
            username,
            discord_id,
            rank,
            authentication_level
        });
        setRegistrationKey(registrationKey)
        setGenerated(true)
    }

    const reset = async function() {
        setGenerated(false)
    }

    if (!generated) {
        return (
            <div className={"account-generator-form-wrapper"}>
                <h1>Account Generator</h1>
                <div className={"account-generator-form"}>
                    <form onSubmit={handleSubmit}>
                        <input type={"text"} placeholder={"Username"} onChange={e => setUsername(e.target.value)}/>
                        <input type={"number"} placeholder={"Discord ID"} onChange={e => setDiscordId(e.target.value)}/>
                        <input type={"text"} placeholder={"Rank"} onChange={e => setRank(e.target.value)}/>
                        <select defaultValue={"Division Staff"} onChange={e => setAuthenticationLevel(e.target.value)}>
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
            <div className={'generated-wrapper'}>
                <h1>Account Generator</h1>
                <div className={'key-output'}>
                    <h4>Registration key: <div className={'key'}>{registration_key["regKey"]}</div></h4>
                    <form onSubmit={reset}>
                        <button>Register new account</button>
                    </form>
                </div>
            </div>
        );
    }
}