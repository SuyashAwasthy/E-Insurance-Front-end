import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsurancePolicyManagement = () => {
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/E-Insurance/admin/getAllPolicies')
            .then(response => setPolicies(response.data))
            .catch(error => console.error('Error fetching policies:', error));
    }, []);

    return (
        <div>
            <h2>Manage Insurance Policies</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Policy Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map(policy => (
                        <tr key={policy.policyId}>
                            <td>{policy.policyId}</td>
                            <td>{policy.name}</td>
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

export default InsurancePolicyManagement;
