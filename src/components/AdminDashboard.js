import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EmployeeManagement from './EmployeeManagement';
import AgentManagement from './AgentManagement';
import InsurancePlanManagement from './InsurancePlanManagement';
import InsuranceSchemeManagement from './InsuranceSchemeManagement';
import InsurancePolicyManagement from './InsurancePolicyManagement';
import TaxSettingManagement from './TaxSettingManagement';
import CityManagement from './CityManagement';
import StateManagement from './StateManagement';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <nav className="sidebar">
                <ul>
                    <li><Link to="/admin/employees">Manage Employees</Link></li>
                    <li><Link to="/admin/agents">Manage Agents</Link></li>
                    <li><Link to="/admin/plans">Manage Insurance Plans</Link></li>
                    <li><Link to="/admin/schemes">Manage Insurance Schemes</Link></li>
                    <li><Link to="/admin/policies">Manage Insurance Policies</Link></li>
                    <li><Link to="/admin/tax">Manage Tax Settings</Link></li>
                    <li><Link to="/admin/cities">Manage Cities</Link></li>
                    <li><Link to="/admin/states">Manage States</Link></li>
                </ul>
            </nav>
            <div className="main-panel">
                <Routes>
                    <Route path="/admin/employees" element={<EmployeeManagement />} />
                    <Route path="/admin/agents" element={<AgentManagement />} />
                    <Route path="/admin/plans" element={<InsurancePlanManagement />} />
                    <Route path="/admin/schemes" element={<InsuranceSchemeManagement />} />
                    <Route path="/admin/policies" element={<InsurancePolicyManagement />} />
                    <Route path="/admin/tax" element={<TaxSettingManagement />} />
                    <Route path="/admin/cities" element={<CityManagement />} />
                    <Route path="/admin/states" element={<StateManagement />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
