
// import React, { useState, useEffect } from 'react';
// import './RegisterPage.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// const RegisterPage = () => {
//     const [selectedRole, setSelectedRole] = useState('');
// const navigate=useNavigate();
//     const handleRoleChange = (event) => {
//         setSelectedRole(event.target.value);
//     };
//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     return (
//         <div>
//             <h1 className="h1">Register</h1>
//             <form className="form">
//                 <label className="label" htmlFor="role">Select Role:</label>
//                 <select className="input" id="role" value={selectedRole} onChange={handleRoleChange}>
//                     <option value="">Select a role</option>
//                     <option value="ROLE_ADMIN">Admin</option>
//                     <option value="ROLE_CUSTOMER">Customer</option>
//                 </select>
//             </form>
//             <Button onClick={handleGoBack} className="mt-3">
//                 Go Back!
//             </Button>

//             {selectedRole === 'ROLE_ADMIN' && <AdminForm />}
//             {selectedRole === 'ROLE_CUSTOMER' && <CustomerForm />}
//         </div>
//     );
// };

// const AdminForm = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         phone_number: '',
//         roles: ['ROLE_ADMIN']
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         setErrors({ ...errors, [e.target.name]: '' });
//     };

//     const isFormValid = () => {
//         return formData.username && formData.email && formData.password && formData.firstName && formData.lastName && formData.phone_number;
//     };

//     const validateForm = () => {
//         const newErrors = {};
        
//         // Username validation
//         if (!formData.username) newErrors.username = 'Username is required';
        
//         // Email validation
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
        
//         // Password validation
//         if (!formData.password) newErrors.password = 'Password is required';
//         else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
        
//         // First name and last name validation
//         if (!formData.firstName) newErrors.firstName = 'First name is required';
//         if (!formData.lastName) newErrors.lastName = 'Last name is required';
        
//         // Phone number validation
//         if (!formData.phone_number) {
//             newErrors.phone_number = 'Phone number is required';
//         } else if (!/^\d{10}$/.test(formData.phone_number)) {
//             newErrors.phone_number = 'Phone number must be 10 digits';
//         }
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         try {
//             const response = await fetch('http://localhost:8080/E-Insurance/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error('Registration failed');
//             }

//             const result = await response.json();
//             console.log('Registration successful:', result);
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     return (
//         <div className="card">
//             <form onSubmit={handleSubmit} className="form">
//                 <h2>Admin Registration</h2>
//                 {['username', 'email', 'password', 'firstName', 'lastName', 'phone_number'].map((field) => (
//                     <div key={field} className="form-group">
//                         <label className="label" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}</label>
//                         <input
//                             className="input"
//                             type={field === 'password' ? 'password' : 'text'}
//                             id={field}
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             required
//                         />
//                         {errors[field] && <p className="error">{errors[field]}</p>}
//                     </div>
//                 ))}
//                 <button className="button" type="submit" disabled={!isFormValid()}>Register</button>
//             </form>
//         </div>
//     );
// };

// const CustomerForm = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         phone_number: '',
//         dob: '',
//         cityId: '',  
//         roles: ['ROLE_CUSTOMER']
//     });
//     const [errors, setErrors] = useState({});
//     const [cities, setCities] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCities = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/E-Insurance/toall/cities'); 
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cities');
//                 }
//                 const data = await response.json();
//                 setCities(data.content);  
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cities:', error);
//                 setLoading(false);
//             }
//         };

//         fetchCities();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         setErrors({ ...errors, [e.target.name]: '' });
//     };

//     const isFormValid = () => {
//         return formData.username && formData.email && formData.password && formData.firstName && formData.lastName && formData.phone_number && formData.dob && formData.cityId;
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.username) newErrors.username = 'Username is required';
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
//         if (!formData.password) newErrors.password = 'Password is required';
//         else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
//         if (!formData.firstName) newErrors.firstName = 'First name is required';
//         if (!formData.lastName) newErrors.lastName = 'Last name is required';
//         if (!formData.phone_number) {
//             newErrors.phone_number = 'Phone number is required';
//         } else if (!/^\d{10}$/.test(formData.phone_number)) {
//             newErrors.phone_number = 'Phone number must be 10 digits';
//         }
//         if (!formData.dob) newErrors.dob = 'Date of birth is required';
//         if (!formData.cityId) newErrors.cityId = 'City selection is required';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         try {
//             const response = await fetch('http://localhost:8080/E-Insurance/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error('Registration failed');
//             }

//             const result = await response.json();
//             console.log('Registration successful:', result);
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     return (
//         <div className="card">
//             <form onSubmit={handleSubmit} className="form">
//                 <h2>Customer Registration</h2>
//                 {['username', 'email', 'password', 'firstName', 'lastName', 'phone_number', 'dob'].map((field) => (
//                     <div key={field} className="form-group">
//                         <label className="label" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}</label>
//                         <input
//                             className="input"
//                             type={field === 'password' ? 'password' : field === 'dob' ? 'date' : 'text'}
//                             id={field}
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             required
//                         />
//                         {errors[field] && <p className="error">{errors[field]}</p>}
//                     </div>
//                 ))}
//                 <div className="form-group">
//                     <label className="label" htmlFor="cityId">City:</label>
//                     {loading ? (
//                         <p>Loading cities...</p>
//                     ) : (
//                         <select className="input" id="cityId" name="cityId" value={formData.cityId} onChange={handleChange} required>
//                             <option value="">Select a city</option>
//                             {cities.map(city => (
//                                 <option key={city.cityId} value={city.cityId}>
//                                     {city.name}
//                                 </option>
//                             ))}
//                         </select>
//                     )}
//                     {errors.cityId && <p className="error">{errors.cityId}</p>}
//                 </div>
//                 <button className="button" type="submit" disabled={!isFormValid()}>Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPage;


import React, { useState, useEffect } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div>
            <h1 className="h1">Customer Registration</h1>
            <Button onClick={handleGoBack} className="mt-3">
                Go Back!
            </Button>

            <CustomerForm />
        </div>
    );
};

const CustomerForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone_number: '',
        dob: '',
        cityId: '',  
        roles: ['ROLE_CUSTOMER']  // Static role for customer registration
    });
    
    const [errors, setErrors] = useState({});
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cities from the backend (remove this block if you don't need dynamic cities)
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:8080/E-Insurance/toall/cities'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                setCities(data.content);  // Assuming data.content contains the cities list
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cities:', error);
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    // Form field change handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // Check if the form is valid
    const isFormValid = () => {
        return formData.username && formData.email && formData.password && formData.firstName && formData.lastName && formData.phone_number && formData.dob && formData.cityId;
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        
        // Username validation
        if (!formData.username) newErrors.username = 'Username is required';
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        
        // First name validation
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        
        // Last name validation
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        
        if (!formData.phone_number) {
            newErrors.phone_number = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone_number)) {
            if (formData.phone_number.length !== 10) {
                newErrors.phone_number = 'Phone number must be exactly 10 digits';
            } else {
                newErrors.phone_number = 'Phone number can only contain numbers';
            }
        }
        
        // Date of birth validation
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        
        // City validation
        if (!formData.cityId) newErrors.cityId = 'City selection is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:8080/E-Insurance/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const result = await response.json();
            console.log('Registration successful:', result);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit} className="form">
                <h2>Customer Registration</h2>
                
                {/* Username Field */}
                <div className="form-group">
                    <label className="label" htmlFor="username">Username</label>
                    <input
                        className="input"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                
                {/* Email Field */}
                <div className="form-group">
                    <label className="label" htmlFor="email">Email</label>
                    <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                
                {/* Password Field */}
                <div className="form-group">
                    <label className="label" htmlFor="password">Password</label>
                    <input
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                
                {/* First Name Field */}
                <div className="form-group">
                    <label className="label" htmlFor="firstName">First Name</label>
                    <input
                        className="input"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                </div>
                
                {/* Last Name Field */}
                <div className="form-group">
                    <label className="label" htmlFor="lastName">Last Name</label>
                    <input
                        className="input"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                
                {/* Phone Number Field */}
                <div className="form-group">
                    <label className="label" htmlFor="phone_number">Phone Number</label>
                    <input
                        className="input"
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone_number && <p className="error">{errors.phone_number}</p>}
                </div>
                
                {/* Date of Birth Field */}
                <div className="form-group">
                    <label className="label" htmlFor="dob">Date of Birth</label>
                    <input
                        className="input"
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    {errors.dob && <p className="error">{errors.dob}</p>}
                </div>
                
                {/* City Dropdown */}
                <div className="form-group">
                    <label className="label" htmlFor="cityId">City</label>
                    {loading ? (
                        <p>Loading cities...</p>
                    ) : (
                        <select
                            className="input"
                            id="cityId"
                            name="cityId"
                            value={formData.cityId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a city</option>
                            {cities.map(city => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors.cityId && <p className="error">{errors.cityId}</p>}
                </div>
                
                <button className="button" type="submit" disabled={!isFormValid()}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
