import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsuranceSchemeManagement = () => {
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/E-Insurance/admin/getAllSchemes')
            .then(response => setSchemes(response.data))
            .catch(error => console.error('Error fetching schemes:', error));
    }, []);

    return (
        <div>
            <h2>Manage Insurance Schemes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Scheme Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schemes.map(scheme => (
                        <tr key={scheme.schemeId}>
                            <td>{scheme.schemeId}</td>
                            <td>{scheme.name}</td>
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

export default InsuranceSchemeManagement;
