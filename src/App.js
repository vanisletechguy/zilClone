import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from './actions/listingsActions';
import CreateListingPopup from './components/CreateListingPopup.js';
import EditListingPopup from './components/EditListingPopup';
import FilterBar from './components/FilterBar';
import GoogleMapsComponent from './components/Maps.js';
import Home from './components/Home';
import ListingDetailsPopup from './components/ListingDetailsPopup';
import LoginPopup from './components/LoginPopup.js';
import NavBar from './components/NavBar.js';
import ViewPosts from './components/ViewPosts';


function App() {

    const dispatch = useDispatch();
    const view = useSelector(state => state.view.currentView); 
    const { showLoginPopup, showCreateListingPopup, showListingDetailsPopup, 
        showEditListingPopup } = useSelector(state => state.popup);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);


    const renderView = () => {
        switch (view) {
            case 'welcome':
                return <Home />;
            case 'listings':
                return ( 
                    <div>
                    <FilterBar />
                    <div style={{ display: 'flex', padding: '20px' }}>
                        <GoogleMapsComponent /> 
                        <ViewPosts />
                    </div>
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
                {showListingDetailsPopup && <ListingDetailsPopup />}
                {showEditListingPopup && <EditListingPopup />}
            </div>
        </LoadScript>
    );
}

export default App;
