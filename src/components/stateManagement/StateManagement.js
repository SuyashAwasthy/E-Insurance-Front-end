// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StateManagement = () => {
//     const [states, setStates] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8080/E-Insurance/admin/viewAllstates')
//             .then(response => setStates(response.data.content))
//             .catch(error => console.error('Error fetching states:', error));
//     }, []);

//     return (
//         <div>
//             <h2>Manage States</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>State Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {states.map(state => (
//                         <tr key={state.stateId}>
//                             <td>{state.stateId}</td>
//                             <td>{state.name}</td>
//                             <td>
//                                 <button>Edit</button>
//                                 <button>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StateManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StateManagement.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import StateModal from './StateModal';

// import './StateModal.css'
// import '../components/stateManagement/StateModal.css';
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/admin', // Base URL for your API
    headers: {
        'Content-Type': 'application/json',
    },
});


const StateManagement = () => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const token = localStorage.getItem('authToken');

                // Set the token in the Authorization header
                if (token) {
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }

                const response = await apiClient.get('/viewAllstates');
                setStates(response.data.content);  // Adjust according to your API response structure
            }  catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStates();
    }, []);

    const handleActivate = async (id) => {
        try {
            const response = await apiClient.post(`/state/${id}`);
            alert(response.data);  // Display success message or handle accordingly

            // Update state list after activation
            setStates(states.map(state => 
                state.stateId === id ? { ...state, isActive: true } : state
            ));
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An error occurred';
            alert(`Error activating state: ${errorMessage}`);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            const response = await apiClient.delete(`/deactivate-state/${id}`);  
                      alert(response.data);  // Display success message or handle accordingly

            // Update state list after deactivation
            setStates(states.map(state => 
                state.stateId === id ? { ...state, isActive: false } : state
            ));
        } catch (error) {
            // Check if error.response exists and handle accordingly
            const errorMessage = error.response?.data || error.message || 'An error occurred';
            alert(`Error deactivating state: ${errorMessage}`);
        }
    };

    const handleCreateState = async (stateName) => {
        try {
            const response = await apiClient.post('/create-state', { name: stateName });
            alert(response.data);
            setStates([...states, { name: stateName, isActive: true }]);
            setShowModal(false);
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An error occurred';
            alert(`Error creating state: ${errorMessage}`);
        }
    };
    // const handleCreateState = async (stateName) => {
    //     try {
    //         const response = await apiClient.post('/create-state', { name: stateName });
    //         alert(response.data);
    //         // Fetch the updated states to include the new state with the correct ID
    //         const result = await apiClient.get('/viewAllstates');
    //         setStates([...states, { name: stateName, isActive: true }]);
    //         setShowModal(false);
    //     } catch (error) {
    //         const errorMessage = error.response?.data || error.message || 'An error occurred';
    //         alert(`Error creating state: ${errorMessage}`);
    //     }
    // };
    

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching states: {error.message}</p>;

    return (
        <div>
            <h2>States Management</h2>
            <Button onClick={() => setShowModal(true)} className="create-state-btn">
                Create State
            </Button>
            <br/>
            <table border="5" className="table table-striped">
                <thead>
                    <tr>
                        <th>State ID</th>
                        <th>State Name</th>
                        <th>Is Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {states.map(state => (
                        <tr key={state.stateId}>
                            <td>{state.stateId}</td>
                            <td>{state.name}</td>
                            <td>{state.isActive ? 'active' : 'inActive'}</td>
                            <td>
                                {/* Show "Deactivate" button if state is active */}
                                {state.isActive ? (
                                    <button className="deactivate" onClick={() => handleDeactivate(state.stateId)}>
                                        Deactivate
                                    </button>
                                ) : (
                                    // Show "Activate" button if state is inactive
                                    <button  className="activate" onClick={() => handleActivate(state.stateId)}>
                                        Activate
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

             {/* Include the modal component */}
             <StateModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateState}
            />
           
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
                
        </div>
    );
};

export default StateManagement;
