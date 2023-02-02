import React, {useState} from 'react';

export default function AccountGenerator() {
    const [user, setUser] = useState();

    let userObject = {
        username: 'user',
        discord_id: '1234567890',
        rank: "Private",
        awards: [],
        is_admin: false,
        admin_level: 0,
        division: {
            div_name: "1st Infantry Division",
            div_id: 1,
            position: "Rifleman",
            is_staff: false,
        },
        court_cases: {
            case_id: 1,
            case_name: "user v. United States Army",
            case_description: "user was caught stealing a candy bar from the PX.",
            case_status: "Resolved",
            case_verdict: "Guilty",
            case_sentence: "1 month in the brig",
        }
    }

    this.state.users = userObject;

    let generated = false;

    if (!generated) {
        return (
            <div>
                <h1>Account Generator</h1>
                <div className={"account-generator-form"}>
                    <form>
                        <input type={"text"} placeholder={"Username"}/>
                        <input type={"text"} placeholder={"Discord ID"}/>
                        <input type={"text"} placeholder={"Rank"}/>

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