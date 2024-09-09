import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap'; 
import './InsurancePlans.css';
import { useNavigate } from 'react-router-dom';

const InsurancePlans = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch insurance plans from the backend
        axios.get(`http://localhost:8080/E-Insurance/toall/getAllPlans`)
            .then(response => {
                console.log('API Response:', response.data);  // Log the response data
                setPlans(response.data);
            })
            .catch(error => console.error('Error fetching insurance plans:', error));
    }, []);

    const handleSelect = (planId) => {
        navigate(`/schemes/${planId}`);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Insurance Plans
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {plans.length > 0 ? (
                    plans.map(plan => (
                        <Dropdown.Item key={plan.insurancePlanId} onClick={() => handleSelect(plan.insurancePlanId)}>
                            {plan.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No plans available</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};


export default InsurancePlans
