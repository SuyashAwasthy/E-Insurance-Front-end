// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// //import './ForgotPassword.css';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleForgotPasswordRequest = async (e) => {
//         e.preventDefault();

//         // Validate input
//         const errors = {};
//         if (!email) {
//             errors.email = 'Email is required';
//         }
//         if (Object.keys(errors).length > 0) {
//             setErrors(errors);
//             return;
//         }

//         try {
//             await axios.post('http://localhost:8080/E-Insurance/auth/forgot-password', { email });
//             toast.success("OTP sent to your email!");
//             navigate('/reset-password'); // Navigate to reset password page
//         } catch (error) {
//             toast.error("Error sending OTP. Please try again.");
//             console.error('Forgot password request failed:', error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <div className="forgot-password-container d-flex justify-content-center align-items-center min-vh-100">
//             <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
//                 <h3 className="card-title text-center mb-4">Forgot Password</h3>
//                 <form onSubmit={handleForgotPasswordRequest}>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         {errors.email && <small className="text-danger">{errors.email}</small>}
//                     </div>
//                     <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">Request OTP</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;


import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ForgotPassword.css'; // Ensure this file contains your styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/E-Insurance/auth/forgot-password`, null,
                { params: { email }}
            );
            toast.success('OTP has been sent to your email.');
            navigate('/reset-password'); // Redirect to reset password page
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
            toast.error('Failed to send OTP. Please try again.');
        }
    };
    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="forgot-password-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="card-title text-center mb-4">Forgot Password</h3>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <small className="text-danger">{error}</small>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Send OTP</button>
                    </div>
                </form>
            </div>
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
                
        </div>
    );
};

export default ForgotPassword;
