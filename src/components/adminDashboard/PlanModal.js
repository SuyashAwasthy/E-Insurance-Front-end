import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://localhost:8080/E-Insurance/admin`,
    headers: {
        'Content-Type': 'application/json',
    },
});
const setAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

const PlanModal = ({ show, handleClose, addPlan }) => {
    const [planName, setPlanName] = useState('');
    const [error, setError] = useState(null);

    const handleAddPlan = async () => {
        setAuthToken();
        try {
            const planRequest = { name: planName, active: true }; // Assuming isActive is true by default
            const response = await apiClient.post(`/createPlan`, planRequest);
            console.log(response.data.content);
             //addPlan({ ...planRequest, insurancePlanId: Date.now() }); 
            const newPlan = response.data;
             addPlan(newPlan); // Add the new plan with the ID provided by the backend
           
            handleClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Insurance Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="error">{error}</p>}
                <Form>
                    <Form.Group controlId="formPlanName">
                        <Form.Label>Plan Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter plan name"
                            value={planName}
                            onChange={(e) => setPlanName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleAddPlan}>Add Plan</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PlanModal;
