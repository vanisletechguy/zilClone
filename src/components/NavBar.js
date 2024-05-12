import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import CreateListingPopup from './CreateListingPopup';

import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedOut } from '../actions/authActions';
import { setView } from '../actions/viewActions';


const NavBar = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const handleChangeView = (newView) => {
        dispatch(setView(newView));
    };

    //refactor to redux
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const toggleLoginPopup = () => setShowLoginPopup(!showLoginPopup);

    const [showListingPopup, setShowListingPopup] = useState(false);
    const toggleListingPopup = () => setShowListingPopup(!showListingPopup);


    const onUserLoggedIn = (data) => {
        toggleLoginPopup();
    };

    const handleLogout = () => {
        dispatch(setUserLoggedOut());
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
            {/* Left Buttons */}
            <div>
                <button onClick={() => handleChangeView('welcome')}>Home</button>
                <button onClick={() => handleChangeView('listings')}>Listings</button>
            </div>

            {/* Website Name */}
            <div style={{ alignSelf: 'center' }}>
                Website Name
            </div>

            {/* Right Buttons */}
            <div>
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={toggleListingPopup}>Create Listing</button>
                        <button>My Listings</button>
                    </>
                ) : (
                    <button onClick={toggleLoginPopup}>Login</button>
                )}
            </div>

            {/* Login Popup */}
            {showLoginPopup && <LoginPopup onClose={toggleLoginPopup} onUserLoggedIn={onUserLoggedIn} />}
            {showListingPopup && <CreateListingPopup onClose={toggleListingPopup}/>}
        </div>
    );
};

export default NavBar;
