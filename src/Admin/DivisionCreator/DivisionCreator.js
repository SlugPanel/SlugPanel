import React, {useState} from 'react';
import './DivisionCreator.css'

export default function DivisionCreator() {

    const [divName, setDivName] = useState();
    const [divID, setDivID] = useState();

    const createDivision = async function(formData) {
        return fetch('https://slugga-api.onrender.com/createDivision', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const division = createDivision({
            division_name: divName,
            division_id: divID
        })
    }

    return(
        <div className={'division-creator-wrapper'}>
            <form className={'division-creator-form'} onSubmit={handleSubmit}>
                <h2>Division Creator</h2>
                <input type={'text'} placeholder={'Div Name'} onChange={e => setDivName(e.target.value)} />
                <input type={'number'} placeholder={'Div ID'} onChange={e => setDivID(e.target.value)} />
                <button type={'submit'}>Create Division</button>
            </form>
        </div>
    )
}