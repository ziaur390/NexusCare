import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for session cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// ==================== AUTH SERVICES ====================

export const register = (userData) => {
    return api.post('/register', userData);
};

export const login = (credentials) => {
    return api.post('/login', credentials);
};

export const logout = () => {
    return api.post('/logout');
};

export const checkSession = () => {
    return api.get('/session');
};

// ==================== COMPLAINT SERVICES ====================

export const getComplaints = () => {
    return api.get('/complaints');
};

export const getComplaint = (id) => {
    return api.get(`/complaints/${id}`);
};

export const createComplaint = (complaintData) => {
    return api.post('/complaints', complaintData);
};

export const updateComplaint = (id, complaintData) => {
    return api.put(`/complaints/${id}`, complaintData);
};

export const deleteComplaint = (id) => {
    return api.delete(`/complaints/${id}`);
};

// ==================== ADMIN SERVICES ====================

export const getAllUsers = () => {
    return api.get('/admin/users');
};

export const getStats = () => {
    return api.get('/admin/stats');
};

export default api;
