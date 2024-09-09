import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import RegisterAgent from './components/RegisterAgent';
import AgentProfile from './components/AgentProfile';
import AgentDashboard from './components/AgentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/homePage/HomePage';
import FetchSchemes from './components/FetchSchemes';
import ForgotPassword from './components/forgetPassword/ForgotPassword';
import ResetPassword from './components/forgetPassword/ResetPassword';
import { ToastContainer } from 'react-toastify';
import GlobalToast from './utils/Helpers/GlobalToast';
import Login from './components/login/Login';
import AboutUs from './components/homePage/AboutUs';
//import StateManagement from './components/StateManagement';
import StateManagement from './components/stateManagement/StateManagement';
import City from './components/cityManagement/City';
import InsurancePlanAdmin from './components/adminDashboard/InsurancePlanAdmin';
import EmployeeManagement from './components/adminDashboard/EmployeeManagement';


function App() {
    return (
        <>
        <GlobalToast/>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/register-agent" component={RegisterAgent} />
                <Route path="/agent-profile/:id" component={AgentProfile} />
                <Route path="/dashboard" component={AgentDashboard} />
                <Route path="/schemes/:planId" element={<FetchSchemes />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/about-us" element={<AboutUs/>} />
                <Route path="/states" element={<StateManagement/>}/>
                <Route path="/cities" element={<City/>}/>
<Route path="/plans" element={<InsurancePlanAdmin/>}/>
<Route path="employees" element={<EmployeeManagement/>}/>

            </Routes>
        </Router>
        <ToastContainer/>
        </>
    );
}

export default App;
