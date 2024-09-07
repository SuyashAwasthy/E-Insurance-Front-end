import axios from 'axios';

const API_URL = 'http://localhost:8080/E-Insurance/agent';

export const registerAgent = (agent) => axios.post(`${API_URL}/register`, agent);
export const getAgentById = (id) => axios.get(`${API_URL}/${id}`);
export const updateAgentProfile = (id, agent) => axios.put(`${API_URL}/${id}`, agent);
export const changePassword = (id, newPassword) => axios.put(`${API_URL}/${id}/change-password`, newPassword);
export const registerPolicy = (agentId, policy) => axios.post(`${API_URL}/${agentId}/policies`, policy);
export const calculateCommission = (agentId, policyId) => axios.get(`${API_URL}/${agentId}/commissions`, { params: { policyId } });
export const withdrawCommission = (agentId, amount) => axios.put(`${API_URL}/${agentId}/withdraw`, amount);
export const getAgentPolicies = (agentId) => axios.get(`${API_URL}/${agentId}/policies`);
export const getEarningsReport = (agentId) => axios.get(`${API_URL}/${agentId}/earnings`);
export const getCommissionReport = (agentId) => axios.get(`${API_URL}/${agentId}/commissions/report`);
export const getAllAgents = () => axios.get(API_URL);
