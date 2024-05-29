import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListing } from '../actions/listingsActions';
import { hideEditListingPopup } from '../actions/popupActions';
import styles from './EditListingPopup.module.css';


const EditListingPopup = () => {
    const dispatch = useDispatch();
    const selectedListing = useSelector(state => state.listings.selectedListing);
    const token = useSelector(state => state.auth.token);

    const [formData, setFormData] = useState({
        listing_id: '',
        user_id: '',
        listing_type: 'sale',
        price: '',
        bedrooms: '',
        bathrooms: '',
        property_type: 'house',
        address: '',
        latitude: '',
        longitude: ''
    });
    const [image, setImage] = useState(null);
    const [imageDeleted, setImageDeleted] = useState(false);

    useEffect(() => {
        if (selectedListing) {
            setFormData({
                listing_id: selectedListing.listing_id,
                user_id: selectedListing.user_id,
                listing_type: selectedListing.listing_type,
                price: selectedListing.price,
                bedrooms: selectedListing.bedrooms,
                bathrooms: selectedListing.bathrooms,
                property_type: selectedListing.property_type,
                address: selectedListing.address,
                latitude: selectedListing.latitude,
                longitude: selectedListing.longitude
            });
            setImage(null);
            setImageDeleted(false);
        }
    }, [selectedListing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageDeleted(false);
    };

    const handleDeleteImage = () => {
        setImage(null);
        setImageDeleted(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to edit a listing.");
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (image) {
            data.append('image', image);
        } else if (imageDeleted) {
            data.append('delete_image', true);
        }

        dispatch(updateListing(data, token));
        dispatch(hideEditListingPopup());
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popupContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Listing Type:
                        <select name="listing_type" value={formData.listing_type} 
                        onChange={handleChange} className={styles.inputField}>
                            <option value="sale">Sale</option>
                            <option value="rent">Rent</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Price:
                        <input type="number" name="price" value={formData.price} 
                        onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Bedrooms:
                        <input type="number" name="bedrooms" value={formData.bedrooms} 
                        onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Bathrooms:
                        <input type="number" name="bathrooms" value={formData.bathrooms} 
                        onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Property Type:
                        <select name="property_type" value={formData.property_type} 
                        onChange={handleChange} className={styles.inputField}>
                            <option value="house">House</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="condo">Condo</option>
                            <option value="apartment">Apartment</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Address:
                        <input type="text" name="address" value={formData.address} 
                        onChange={handleChange} className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Latitude:
                        <input type="number" step="0.000001" name="latitude" 
                        value={formData.latitude} onChange={handleChange} 
                        className={styles.inputField} />
                    </label>
                    <label className={styles.label}>
                        Longitude:
                        <input type="number" step="0.000001" name="longitude" 
                        value={formData.longitude} onChange={handleChange} 
                        className={styles.inputField} />
                    </label>
                    {selectedListing && selectedListing.image && !imageDeleted && (
                        <div className={styles.currentImage}>
                            <img src={`${selectedListing.image}`} 
                            alt="Current Listing" className={styles.image} />
                            <button type="button" onClick={handleDeleteImage} 
                            className={styles.deleteButton}>Delete Image</button>
                        </div>
                    )}
                    <label className={styles.label}>
                        New Image:
                        <input type="file" name="image" onChange={handleImageChange} 
                        className={styles.inputField} />
                    </label>
                    <button type="submit" className={styles.submitButton}>Update Listing</button>
                </form>
                <button onClick={() => dispatch(hideEditListingPopup())} 
                className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default EditListingPopup;

