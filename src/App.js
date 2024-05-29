import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from './actions/listingsActions';
import { setView } from './actions/viewActions';
import CreateListingPopup from './components/CreateListingPopup.js';
import EditListingPopup from './components/EditListingPopup';
import FilterBar from './components/FilterBar';
import GoogleMapsComponent from './components/Maps.js';
import Home from './components/Home';
import ListingDetailsPopup from './components/ListingDetailsPopup';
import LoginPopup from './components/LoginPopup.js';
import NavBar from './components/NavBar.js';
import ViewPosts from './components/ViewPosts';
import './App.css';


function App() {

    const dispatch = useDispatch();
    const view = useSelector(state => state.view.currentView); 
    const { showLoginPopup, showCreateListingPopup, showListingDetailsPopup, 
        showEditListingPopup } = useSelector(state => state.popup);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        dispatch(fetchListings());
        dispatch(setView('welcome'));
    }, [dispatch]);


    const renderView = () => {
        switch (view) {
            case 'welcome':
                return( 
                    <div style={{padding: '0px'}}>
                        <FilterBar />
                        <div style={{ display: 'flex', padding: '0px' }}>
                            <Home />
                        </div>
                    </div>
                    );
            case 'listings':
                return ( 
                    <div>
                        <FilterBar />
                        <div className="listings-container">
                            <div className="map-wrapper">
                                <GoogleMapsComponent />
                            </div>
                            <div className="posts-wrapper">
                                <ViewPosts />
                            </div>
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
