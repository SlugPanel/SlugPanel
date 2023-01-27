import React from 'react';

export default function OrbatLine(props) {
    return (
        <div className={"orbat-line"}>
            <ul>
                <li>{props.name}</li>
                <li>{props.rank}</li>
                <li>{props.role}</li>
                <li>{props.status}</li>
            </ul>
        </div>
    );
}