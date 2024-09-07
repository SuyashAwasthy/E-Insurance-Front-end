import React, { useState } from 'react';
import { registerAgent } from '../services/agentService';

const RegisterAgent = () => {
  const [agent, setAgent] = useState({ name: '', email: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAgent(agent);
      alert('Agent registered successfully');
    } catch (error) {
      console.error('There was an error registering the agent!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={agent.name}
        onChange={(e) => setAgent({ ...agent, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={agent.email}
        onChange={(e) => setAgent({ ...agent, email: e.target.value })}
        placeholder="Email"
      />
      {/* Add other fields as necessary */}
      <button type="submit">Register Agent</button>
    </form>
  );
};

export default RegisterAgent;
