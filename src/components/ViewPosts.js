import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

function ViewPosts() {
    //    const [posts, setPosts] = useState([]);
    const { listings, loading, error } = useSelector(state => state.listings);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <div style={{ flex: 1, overflowY: 'auto', marginRight: '20px' }}>
            {listings.length > 0 ? (
                listings.map(listing => (
                    <div key={listing.user_id} style={{ 
                        border: '1px solid #ccc', margin: '10px', 
                        padding: '10px', borderRadius: '5px', 
                        backgroundColor: '#f9f9f9', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>

                        <h3>{listing.address}</h3>
                        <p>Type: {listing.listing_type}</p>
                        <p>Price: ${listing.price}</p>
                        <p>Bedrooms: {listing.bedrooms}</p>
                        <p>Bathrooms: {listing.bathrooms}</p>
                        <p>Property Type: {listing.property_type}</p>
                        <p>Latitude: {listing.latitude}</p>
                        <p>Longitude: {listing.longitude}</p>
                        <p>Created At: {listing.created_at || 'N/A'}</p>
                    </div>
                ))
            ) : (
                <div>No listings available.</div>
            )}
        </div>
    );
}

export default ViewPosts;
