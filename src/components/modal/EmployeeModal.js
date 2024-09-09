// src/components/EditEmployeeModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import adminApiClient from '../../headers/Token';

const EmployeeModal = ({ show, handleClose, employee, onUpdate }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
       
        firstName: '',
        lastName: '',
        active: true
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                username: employee.username,
                email: employee.email,
                firstName: employee.name,
                lastName: employee.lastName,
                isActive: employee.isActive
            });
        }
    }, [employee]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminApiClient.put(`/updateEmployee/${employee.employeeId}`, formData);
            onUpdate(); // Notify parent to refresh data
            handleClose();
        } catch (err) {
            console.error("Error updating employee:", err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleFormChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleFormChange} 
                        />
                   </Form.Group>
                   <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleFormChange} 
                        />
                    </Form.Group>
  
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleFormChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="checkbox" 
                            name="isActive" 
                            checked={formData.isActive} 
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))} 
                            label="Active" 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeModal;
