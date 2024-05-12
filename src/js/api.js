import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ADDRESS; 

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

export const fetchListings = async () => {
    try {
        return await axios.get(`${API_URL}/listings`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to fetch listings');
    }
};

export const createListing = async (listingData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        };
        const response = await axios.post(`${API_URL}/listings`, listingData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to create listing');
    }
};
