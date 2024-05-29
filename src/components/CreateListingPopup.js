import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createListing } from '../actions/listingsActions';
import { hideCreateListingPopup } from '../actions/popupActions.js';
import styles from './CreateListingPopup.module.css'; 

const CreateListingPopup = () => {
    const userId = useSelector(state => state.auth.userId);
    const [formData, setFormData] = useState({
        user_id: userId,
        listing_type: 'sale', // default to 'sale'
        price: '',
        bedrooms: '',
        bathrooms: '',
        property_type: 'house', // default to 'house'
        address: '',
        latitude: '',
        longitude: '',
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        square_footage: ''
    });
    const [images, setImages] = useState([]);

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to create a listing.");
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        images.forEach((image, index) => {
            data.append('images', image);
        });

        dispatch(createListing(data, token));
        dispatch(hideCreateListingPopup());
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popupContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Listing Type:
                        <select name="listing_type" value={formData.listing_type} onChange={handleChange} className={styles.inputField}>
                            <option value="sale">Sale</option>
                            <option value="rent">Rent</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Bedrooms:
                        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Bathrooms:
                        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Property Type:
                        <select name="property_type" value={formData.property_type} onChange={handleChange} className={styles.inputField}>
                            <option value="house">House</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="condo">Condo</option>
                            <option value="apartment">Apartment</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Latitude:
                        <input type="number" step="0.000001" name="latitude" value={formData.latitude} onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Longitude:
                        <input type="number" step="0.000001" name="longitude" value={formData.longitude} onChange={handleChange} className={styles.inputField} />
                    </label>
                     <label className={styles.label}>
                        Square Footage:
                        <input type="number" name="square_footage" value={formData.square_footage} onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Images:
                        <input type="file" name="images" onChange={handleImageChange} multiple className={styles.inputField} />
                    </label>
                    <button type="submit" className={styles.submitButton}>Create Listing</button>
                </form>
                <button onClick={() => dispatch(hideCreateListingPopup())} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default CreateListingPopup;







