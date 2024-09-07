import React, { useState, useEffect } from 'react';
import { getAllAgents } from '../services/agentService';

const AgentDashboard = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAllAgents();
        setAgents(response.data);
      } catch (error) {
        console.error('There was an error fetching agents!', error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div>
      <h1>Agent Dashboard</h1>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>{agent.name} - {agent.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AgentDashboard;
