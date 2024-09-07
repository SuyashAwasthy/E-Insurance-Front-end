import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentManagement = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/E-Insurance/admin/getAllAgents')
            .then(response => setAgents(response.data.content))
            .catch(error => console.error('Error fetching agents:', error));
    }, []);

    return (
        <div>
            <h2>Manage Agents</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map(agent => (
                        <tr key={agent.agentId}>
                            <td>{agent.agentId}</td>
                            <td>{agent.name}</td>
                            <td>{agent.email}</td>
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

export default AgentManagement;
