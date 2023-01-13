import React from 'react';

export default class Dashboard extends React.Component {
    render() {
        const { user } = this.props;
        return (
        <div>
            <h1>Dashboard</h1>
        </div>
        );
    }
}