import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

const CityModal = ({ show, handleClose, addCity }) => {
    const [cityName, setCityName] = useState('');
    const [selectedStateId, setSelectedStateId] = useState('');
    const [states, setStates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                // Set token for authorization
                const token = localStorage.getItem('authToken');
                if (token) {
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }

                const response = await apiClient.get('/viewAllstates');
                setStates(response.data.content);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStates();
    }, []);

    const handleAddCity = async () => {
        try {
            const cityRequest = { name: cityName, state_id: selectedStateId };
            await apiClient.post('/create-city', cityRequest);
            addCity({ ...cityRequest, cityId: Date.now(), isActive: true });
            handleClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* {error && <p className="error">{error}</p>} */}
                <Form>
                    <Form.Group controlId="formCityName">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city name"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>Select State</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedStateId}
                            onChange={(e) => setSelectedStateId(e.target.value)}
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.stateId} value={state.stateId}>{state.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleAddCity}>Add City</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CityModal;
