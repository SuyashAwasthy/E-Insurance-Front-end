import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityManagement = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/E-Insurance/admin/cities')
            .then(response => setCities(response.data.content))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    return (
        <div>
            <h2>Manage Cities</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>City Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map(city => (
                        <tr key={city.id}>
                            <td>{city.id}</td>
                            <td>{city.name}</td>
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

export default CityManagement;
