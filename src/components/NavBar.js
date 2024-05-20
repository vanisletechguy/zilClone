import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../actions/viewActions';
import { setUserLoggedOut } from '../actions/authActions.js';
import { showCreateListingPopup, showLoginPopup } from '../actions/popupActions.js';

const NavBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const handleChangeView = (newView) => {
        dispatch(setView(newView));
    };

    const handleLogout = () => {
        dispatch(setUserLoggedOut());
    };

    return (
        <div style={styles.navbar}>
            {/* Left Buttons */}
            <div style={styles.navSection}>
                <button style={styles.navButton} onClick={() => handleChangeView('welcome')}>
                    Home</button>
                <button style={styles.navButton} onClick={() => handleChangeView('listings')}>
                    Listings</button>
            </div>

            {/* Website Name */}
            <div style={styles.websiteName}>
                <h1 style={styles.title}>Website Name</h1>
            </div>

            {/* Right Buttons */}
            <div style={styles.navSection}>
                {isLoggedIn ? (
                    <>
                        <button style={styles.navButton} onClick={handleLogout}>Logout</button>
                        <button style={styles.navButton} onClick={() => dispatch(showCreateListingPopup())}>
                        Create Listing</button>
                        <button style={styles.navButton}>My Listings</button>
                    </>
                ) : (
                    <button style={styles.navButton} onClick={() => dispatch(showLoginPopup())}>
                    Login</button>
                )}
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    navSection: {
        display: 'flex',
        alignItems: 'center',
    },
    navButton: {
        margin: '0 10px',
        padding: '10px 20px',
        backgroundColor: '#61dafb',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    websiteName: {
        textAlign: 'center',
    },
    title: {
        margin: 0,
        fontSize: '24px',
    },
};

export default NavBar;

