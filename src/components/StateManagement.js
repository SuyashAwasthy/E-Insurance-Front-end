import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateManagement = () => {
    const [states, setStates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/E-Insurance/admin/viewAllstates')
            .then(response => setStates(response.data.content))
            .catch(error => console.error('Error fetching states:', error));
    }, []);

    return (
        <div>
            <h2>Manage States</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>State Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {states.map(state => (
                        <tr key={state.stateId}>
                            <td>{state.stateId}</td>
                            <td>{state.name}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StateManagement;
