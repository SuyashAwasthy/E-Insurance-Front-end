// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import apiClient from '../../headers/Token';

// const EmployeeManagement = () => {
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Ensure the token is set before making the request
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await apiClient.get('/getAllEmployees');
//             setEmployees(response.data);
//         } catch (err) {
//             setError(err.message);
//         }
//     };


//     return (
//         <div>
//             <h2>Employee Management</h2>
//             {error && <p className="error">{error}</p>}
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Position</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employees.map(employee => (
//                         <tr key={employee.id}>
//                             <td>{employee.id}</td>
//                             <td>{employee.name}</td>
//                             <td>{employee.position}</td>
//                             <td>{employee.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default EmployeeManagement;

import React, { useEffect, useState } from 'react';
import adminApiClient from '../../headers/Token';
import { Button } from 'react-bootstrap';
import EmployeeModal from '../modal/EmployeeModal';
import { useNavigate } from 'react-router-dom';
import './EmployeeManagement.css'
const EmployeeManagement = () => {
    const navigate = useNavigate();
    
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        totalElements: 0,
        totalPages: 0,
        isLast: false
    });

// State for modal
const [showModal, setShowModal] = useState(false);
const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, [pagination.page]);

    const fetchEmployees = async () => {
        try {
            const response = await adminApiClient.get('/getAllEmployees', {
                params: {
                    page: pagination.page,
                    size: pagination.size
                }
            });
            const data = response.data;
            setEmployees(data.content); // Update employees with the list from the API
            setPagination({
                page: data.page,
                size: data.size,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                isLast: data.isLast
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await adminApiClient.delete(`/deactivate/${id}`);
            // Remove the deactivated employee from the list
            setEmployees(employees.map(emp => emp.employeeId === id ? { ...emp, isActive: false } : emp));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleUpdate = () => {
        fetchEmployees(); // Refresh the list after updating
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination(prev => ({
                ...prev,
                page: newPage
            }));
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };


    return (
        <div>
            <h2>Employee Management</h2>
            <br/>
            <br/>
            {error && <p className="error">{error}</p>}
            <table border="5" className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Status</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.active ? 'Active' : 'Inactive'}</td>
                            <td>{employee.username}</td>
                            <td>{employee.email}</td>
                            <td>
                                {employee.active && (
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDeactivate(employee.employeeId)}
                                    >
                                        Deactivate
                                    </Button>
                                    
                                )}
                                <Button 
                                    variant="warning" 
                                    onClick={() => handleEdit(employee)}
                                    className="ms-2"
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="pagination-controls">
                <button 
                    onClick={() => handlePageChange(pagination.page - 1)} 
                    disabled={pagination.page === 0}
                >
                    Previous
                </button>
                <span>Page {pagination.page + 1} of {pagination.totalPages}</span>
                <button 
                    onClick={() => handlePageChange(pagination.page + 1)} 
                    disabled={pagination.isLast}
                >
                    Next
                </button>
            </div>
             {/* Edit Employee Modal */}
             <EmployeeModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                employee={selectedEmployee} 
                onUpdate={handleUpdate} 
            />

<div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
        </div>
    );
};

export default EmployeeManagement;

