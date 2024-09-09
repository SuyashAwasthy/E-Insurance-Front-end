// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// //import './ResetPassword.css';

// const ResetPassword = () => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleResetPassword = async (e) => {
//         e.preventDefault();

//         // Validate inputs
//         const errors = {};
//         if (!email) {
//             errors.email = 'Email is required';
//         }
//         if (!otp) {
//             errors.otp = 'OTP is required';
//         }
//         if (!newPassword) {
//             errors.newPassword = 'New password is required';
//         }
//         if (newPassword !== confirmPassword) {
//             errors.confirmPassword = 'Passwords do not match';
//         }
//         if (Object.keys(errors).length > 0) {
//             setErrors(errors);
//             return;
//         }

//         try {
//             await axios.post('http://localhost:8080/E-Insurance/auth/validate-otp', { email, otp, newPassword, confirmPassword });
//             toast.success("Password reset successfully!");
//             navigate('/login'); // Navigate back to login page
//         } catch (error) {
//             toast.error("Error resetting password. Please try again.");
//             console.error('Reset password failed:', error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <div className="reset-password-container d-flex justify-content-center align-items-center min-vh-100">
//             <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
//                 <h3 className="card-title text-center mb-4">Reset Password</h3>
//                 <form onSubmit={handleResetPassword}>
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
//                     <div className="mb-3">
//                         <label htmlFor="otp" className="form-label">OTP</label>
//                         <input
//                             type="text"
//                             id="otp"
//                             className="form-control"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                         />
//                         {errors.otp && <small className="text-danger">{errors.otp}</small>}
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="newPassword" className="form-label">New Password</label>
//                         <input
//                             type="password"
//                             id="newPassword"
//                             className="form-control"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                         />
//                         {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             className="form-control"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
//                     </div>
//                     <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">Reset Password</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ResetPassword.css'; // Ensure this file contains your styling
import { notify } from '../../utils/Helpers/GlobalToast';
const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.post(`http://localhost:8080/E-Insurance/auth/validate-otp`,null, {
                params: { email, otp, newPassword, confirmPassword }
            });
            // toast.success('Password has been updated.');
            notify('Password has been updated.','success');
            navigate('/'); // Redirect to login page after successful password reset
        } catch (error) {
            setError('Failed to update password. Please try again.');
           // toast.error('Failed to update password. Please try again.');
            notify('Failed to update password. Please try again.','error');
        }
    };

    return (
        <div className="reset-password-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="card-title text-center mb-4">Reset Password</h3>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            className="form-control"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <small className="text-danger">{error}</small>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

