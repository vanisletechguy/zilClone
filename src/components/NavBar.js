// src/components/NavBar.js
import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedOut } from '../actions/authActions';


const NavBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    const onUserLoggedIn = (data) => {
        togglePopup();
    };

    const handleLogout = () => {
        dispatch(setUserLoggedOut());
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
            {/* Left Buttons */}
            <div>
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
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
                        <button>Profile</button>
                        <button>Settings</button>
                    </>
                ) : (
                    <button onClick={togglePopup}>Login</button>
                )}
            </div>

            {/* Login Popup */}
            {showPopup && <LoginPopup onClose={togglePopup} onUserLoggedIn={onUserLoggedIn} />}
        </div>
    );
};

export default NavBar;
