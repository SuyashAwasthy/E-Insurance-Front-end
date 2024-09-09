import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EmployeeManagement from './adminDashboard/EmployeeManagement.js';
import AgentManagement from './AgentManagement.js';
import InsuranceSchemeManagement from './InsuranceSchemeManagement';
import InsurancePolicyManagement from './InsurancePolicyManagement';
import TaxSettingManagement from './TaxSettingManagement';
import City from './cityManagement/City.js';
//import StateManagement from './StateManagement';
import StateManagement from './stateManagement/StateManagement.js';
import './AdminDashboard.css'
import { Dropdown } from 'react-bootstrap'; 
import InsurancePlanAdmin from './adminDashboard/InsurancePlanAdmin.js';
import { notify } from '../utils/Helpers/GlobalToast.js';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        
        localStorage.removeItem("authToken");
         navigate("/");
         notify('Back to LoginBoard!', 'success'); 
       };

    return (
        <div className="admin-dashboard">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link" to="/employees">Manage Employees</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/agents">Manage Agents</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/plans">Manage Insurance Plans</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/schemes">Manage Insurance Schemes</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/policies">Manage Insurance Policies</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin/tax">Manage Tax Settings</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cities">Manage Cities</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/states">Manage States</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="main-panel">
                <Routes>
                    <Route path="/employees" element={<EmployeeManagement />} />
                    <Route path="/admin/agents" element={<AgentManagement />} />
                    <Route path="/admin/plans" element={<InsurancePlanAdmin />} />
                    <Route path="/admin/schemes" element={<InsuranceSchemeManagement />} />
                    <Route path="/admin/policies" element={<InsurancePolicyManagement />} />
                    <Route path="/admin/tax" element={<TaxSettingManagement />} />
                    <Route path="/cities" element={<City />} />
                    <Route path="/states" element={<StateManagement />} />
                </Routes>
            </div>
            <button onClick={handleLogout} className="go-back-button ">
         Logout
       </button>
        </div>
    );
};

export default AdminDashboard;
