// CityManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './City.css'; // Make sure to create appropriate styles
import CityModal from './CityModal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/admin', // Base URL for your API
    headers: {
        'Content-Type': 'application/json',
    },
});

const City = () => {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    

    // Function to set token for all requests
    const setAuthToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    };

    useEffect(() => {
        setAuthToken();

        const fetchCities = async () => {
            try {
                const response = await apiClient.get('/cities');
                setCities(response.data.content);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCities();
    }, []);

    const handleActivate = async (id) => {
        try {
            await apiClient.put(`/city/${id}`);
            setCities(cities.map(city => city.cityId === id ? { ...city, isActive: true } : city));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await apiClient.delete(`/city/${id}`);
            setCities(cities.map(city => city.cityId === id ? { ...city, isActive: false } : city));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddCity = (newCity) => {
        setCities([...cities, newCity]);
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="city-management">
            <h2>Manage Cities</h2>
            {error && <p className="error">{error}</p>}
            <Button variant="primary" onClick={() => setShowModal(true)}>Add City</Button>
            <br/>
            <CityModal show={showModal} handleClose={() => setShowModal(false)} addCity={handleAddCity} />
                <br/>
            <table   border="5" className="table table-striped">
                <thead>
                    <tr>
                        <th>City ID</th>
                        <th>Name</th>
                        <th>State ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map(city => (
                        <tr key={city.cityId}>
                            <td>{city.cityId}</td>
                            <td>{city.name}</td>
                            <td>{city.stateId}</td>
                            <td>{city.isActive ? 'Active' : 'Inactive'}</td>
                            <td>
                                {city.isActive ? (
                                    <button className="deactivate-btn" onClick={() => handleDeactivate(city.cityId)}>Deactivate</button>
                                ) : (
                                    <button className="activate-btn" onClick={() => handleActivate(city.cityId)}>Activate</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
               
        </div>
    );
};
export default City;
