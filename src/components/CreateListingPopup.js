import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createListing } from '../actions/listingsActions';


const CreateListingPopup = ({ onClose }) => {
    const { userId } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        user_id: '1',
        listing_type: 'sale', // default to 'sale'
        price: '',
        bedrooms: '',
        bathrooms: '',
        property_type: 'house', // default to 'house'
        address: '',
        latitude: '',
        longitude: ''
    });

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to create a listing.");
            return;
        }
        dispatch(createListing(formData, token));
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
            padding: '20px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 1000
        }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Listing Type:
                    <select name="listing_type" value={formData.listing_type} onChange={handleChange}>
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                    </select>
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </label>
                <label>
                    Bedrooms:
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
                </label>
                <label>
                    Bathrooms:
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
                </label>
                <label>
                    Property Type:
                    <select name="property_type" value={formData.property_type} onChange={handleChange}>
                        <option value="house">House</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="condo">Condo</option>
                        <option value="apartment">Apartment</option>
                    </select>
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <label>
                    Latitude:
                    <input type="number" step="0.000001" name="latitude" value={formData.latitude} onChange={handleChange} />
                </label>
                <label>
                    Longitude:
                    <input type="number" step="0.000001" name="longitude" value={formData.longitude} onChange={handleChange} />
                </label>
                <button type="submit">Create Listing</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CreateListingPopup;


