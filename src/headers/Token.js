import axios from 'axios';

// Create an Axios instance
const adminApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set the Authorization header
const setAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        adminApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

// Call this function to set the token whenever necessary
setAuthToken();

export default adminApiClient;
