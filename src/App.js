import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from './actions/listingsActions';
import Home from './components/Home';
import ViewPosts from './components/ViewPosts';
import NavBar from './components/NavBar.js';
import GoogleMapsComponent from './components/Maps.js';
import LoginPopup from './components/LoginPopup.js';
import CreateListingPopup from './components/CreateListingPopup.js';

function App() {

    const dispatch = useDispatch();
    const view = useSelector(state => state.view.currentView); // Use Redux state
    const { showLoginPopup, showCreateListingPopup } = useSelector(state => state.popup);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        dispatch(fetchListings());  // Load listings when App mounts
    }, [dispatch]);


    const renderView = () => {
        switch (view) {
            case 'welcome':
                //return <Home />;
                return <Home />;
            case 'listings':
                return ( 
                    <div style={{ display: 'flex', padding: '20px' }}>
                        <GoogleMapsComponent /> 
                        <ViewPosts />
                    </div>
                );
            default:
                return <Home />;
        }
    };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <div>
                <NavBar />
                {renderView()}
                {showLoginPopup && <LoginPopup />}
                {showCreateListingPopup && <CreateListingPopup />}
            </div>
        </LoadScript>
    );
}

export default App;
