import React, { useEffect, useState } from 'react';
import { getAgentById, updateAgentProfile } from '../services/agentService';

const AgentProfile = ({ agentId }) => {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await getAgentById(agentId);
        setAgent(response.data);
      } catch (error) {
        console.error('There was an error fetching the agent!', error);
      }
    };
    fetchAgent();
  }, [agentId]);

  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAgentProfile(agentId, agent);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('There was an error updating the profile!', error);
    }
  };

  if (!agent) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={agent.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={agent.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* Add other fields as necessary */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default AgentProfile;
