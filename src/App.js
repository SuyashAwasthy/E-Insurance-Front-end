import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import RegisterAgent from './components/RegisterAgent';
import AgentProfile from './components/AgentProfile';
import AgentDashboard from './components/AgentDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/register-agent" component={RegisterAgent} />
                <Route path="/agent-profile/:id" component={AgentProfile} />
                <Route path="/dashboard" component={AgentDashboard} />
            </Routes>
        </Router>
    );
}

export default App;
