import React from 'react';

export default function Orbat() {
    return (
        <div className={"orbat-wrapper"}>
            <h1>Orbat</h1>
            <div className={"dropdown-wrapper"}>
                <label htmlFor={"orbat-names"}>Division:</label>
                <select name={"orbat-name"} id={"orbat-name"}>
                    <option value={"Headquarters"}>Headquarters</option>
                    <option value={"1st Infantry Division"}>1st Infantry Division</option>
                    <option value={"Military Police Corps"}>Military Police Corps</option>
                    <option value={"Judge Advocate General Corps"}>Judge Advocate General Corps</option>
                    <option value={"TRADOC"}>TRADOC</option>
                    <option value={"US Army Special Operations Command"}>US Army Special Operations Command</option>
                    <option value={"Army Intelligence and Security Command"}>Army Intelligence and Security Command</option>
                    <option value={"Quartermaster Corps"}>Quartermaster Corps</option>
                    <option value={"Army Public Affairs"}>Army Public Affairs</option>
                </select>
                <div className={"orbat-list"}>
                </div>
            </div>
        </div>
    );
}