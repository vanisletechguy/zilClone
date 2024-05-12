import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import ViewPosts from './components/ViewPosts';
import NavBar from './components/NavBar.js';
import GoogleMapsComponent from './components/Maps.js';

function App() {

    const dispatch = useDispatch();
    const view = useSelector(state => state.view.currentView); // Use Redux state
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const renderView = () => {
        switch (view) {
            case 'welcome':
                return <Home />;
            case 'listings':
                return ( 
                    <div>
                        <ViewPosts />
                        <GoogleMapsComponent /> 
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
            </div>
        </LoadScript>

    );
}

export default App;
