// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'

// const Login = () => {
//     const [usernameOrEmail, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/E-Insurance/auth/login', { "usernameOrEmail":usernameOrEmail,
//                 "password":password});
//             localStorage.setItem('token', response.data.token); // Store JWT token
//             navigate('/admin/dashboard');
//         } catch (error) {
//             console.error('Login failed:', error.response.data.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//             <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={usernameOrEmail}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css'; // Ensure this file contains your styling
import {  Button } from 'react-bootstrap';
import { notify } from '../../utils/Helpers/GlobalToast';


const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate inputs
        const errors = {};
        if (!usernameOrEmail) {
            errors.usernameOrEmail = 'Username or email is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            // Perform login
            const response = await axios.post('http://localhost:8080/E-Insurance/auth/login', {
                usernameOrEmail,
                password
            });

            const { accessToken, role } = response.data;
            localStorage.setItem('authToken', accessToken); // Store JWT token
            localStorage.setItem('UserRole', role); // Store user role

            toast.success("Login successful!");

            // Navigate based on role
            if (role === 'ROLE_ADMIN') {
                navigate('/admindashboard'); // Redirect to Admin Dashboard
            } else if (role === 'ROLE_CUSTOMER') {
                navigate('/customer-dashboard'); // Redirect to Customer Dashboard
            } else if (role === 'ROLE_AGENT') {
                navigate('/agent-dashboard'); // Redirect to Agent Dashboard
            } 
            else if (role === 'ROLE_EMPLOYEE') {
                navigate('/employee-dashboard'); // Redirect to Agent Dashboard
            }
            else {
                navigate('/default-dashboard'); // Fallback
            }
        } catch (error) {
            
            notify('Login failed. Please try again.','error')
            console.error('Login failed:', error.response?.data?.message || error.message);
        }
    };
    
    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };


    return (
        <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="card-title text-center mb-4">Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
                        <input
                            type="text"
                            id="usernameOrEmail"
                            className="form-control"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                        />
                        {errors.usernameOrEmail && <small className="text-danger">{errors.usernameOrEmail}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="text-center mt-3">
                    <Button onClick={handleForgotPassword} className="btn btn-link">
                        Forgot Password?
                    </Button>
                </div>
                </form>
            </div>
            
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
                
                

                
        </div>
    );
};

export default Login;
