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


export const fetchFilteredListings = async (filters) => {
    try {
        console.log("in fetchFilteredListings, filters are: ", filters);
        const queryParams = new URLSearchParams(filters).toString();
        console.log("in fetchFilteredListings, queryParams are: ", queryParams);
        console.log('${API_URL}/filteredListings?${queryParams}');
        return await axios.get(`${API_URL}/filteredListings?${queryParams}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to fetch filtered listings');
    }
};


export const createListing = async (formData, token) => {
    console.log("in createListing api.js the formData is: ", formData);
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${API_URL}/listings`, formData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to create listing');
    }
};


export const updateListing = async (formData, token) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };
        const listingId = formData.get('listing_id');
        const response = await axios.put(`${API_URL}/listings/${listingId}`, formData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Unable to update listing');
    }
};



