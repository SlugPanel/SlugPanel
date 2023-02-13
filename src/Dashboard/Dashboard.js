import React from 'react';
import Orbat from "./Orbat/Orbat";
import './Dashboard.css'

export default function Dashboard() {
    return (
        <div className={'dashboard-wrapper'}>
            <h1>Dashboard</h1>
            <Orbat />
        </div>
    );
}