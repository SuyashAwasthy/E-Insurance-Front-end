import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InsurancePlanAdmin.css'; // Add your styles
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PlanModal from './PlanModal';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

const InsurancePlanAdmin = () => {
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    

    const setAuthToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    };

    useEffect(() => {
        setAuthToken();
        fetchPlans(); // Fetch plans on component mount
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await apiClient.get('/getAllPlans');
            setPlans(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleActivate = async (id) => {
        try {
            await apiClient.put(`/activatePlan/${id}`);
            setPlans(plans.map(plan => plan.insurancePlanId === id ? { ...plan, isActive: true } : plan));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await apiClient.delete(`/deactivatePlan/${id}`);
            setPlans(plans.map(plan => plan.insurancePlanId === id ? { ...plan, isActive: false } : plan));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };
    const handleAddPlan = (newPlan) => {
        setPlans([...plans, newPlan]);
    };


    return (
        <div className="insurance-plan-management">
            <h2>Manage Insurance Plans</h2>
            <br/>
            {error && <p className="error">{error}</p>}
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Insurance Plan</Button>

            <PlanModal show={showModal} handleClose={() => setShowModal(false)} addPlan={handleAddPlan} />

            <table  border="5" className="table table-striped">
                <thead>
                    <tr>
                        <th>Plan ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map(plan => (
                        <tr key={plan.insurancePlanId}>
                            <td>{plan.insurancePlanId}</td>
                            <td>{plan.name}</td>
                            <td>{plan.active ? 'Active' : 'Inactive'}</td>
                            <td>
                                {plan.active ? (
                                    <button className="deactivate-btn" onClick={() => handleDeactivate(plan.insurancePlanId)}>Deactivate</button>
                                ) : (
                                    <button className="activate-btn" onClick={() => handleActivate(plan.insurancePlanId)}>Activate</button>
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

export default InsurancePlanAdmin;
