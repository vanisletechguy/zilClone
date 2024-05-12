/*import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
    const [userId, setUserId] = useState('');
    const [listingType, setListingType] = useState('sale');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [propertyType, setPropertyType] = useState('house');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/newPost', {
                userId, listingType, price, bedrooms, bathrooms, propertyType,
                address, latitude, longitude, createdAt
            });
            alert('Post created successfully!');
        } catch (error) {
            alert('Failed to create post: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Create a New Listing</h2>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
            <select value={listingType} onChange={(e) => setListingType(e.target.value)}>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
            </select>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="Bedrooms" />
            <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Bathrooms" />
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
                <option value="condo">Condo</option>
                <option value="apartment">Apartment</option>
            </select>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
            <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} placeholder="Created At" />
            <button onClick={handleSubmit}>Submit Listing</button>
        </div>
    );
}

export default CreatePost;

*/
