import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsurancePlanManagement = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/E-Insurance/admin/getAllPlans')
            .then(response => setPlans(response.data))
            .catch(error => console.error('Error fetching plans:', error));
    }, []);

    return (
        <div>
            <h2>Manage Insurance Plans</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Plan Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map(plan => (
                        <tr key={plan.planId}>
                            <td>{plan.planId}</td>
                            <td>{plan.name}</td>
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

export default InsurancePlanManagement;
