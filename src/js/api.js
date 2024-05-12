import axios from 'axios';

const API_URL = 'http://localhost:3131/api'; 

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to login');
    }
};

export const register = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            firstName,
            lastName,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to register');
    }
};
