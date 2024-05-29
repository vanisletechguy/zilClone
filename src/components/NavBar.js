import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../actions/viewActions';
import { setUserLoggedOut } from '../actions/authActions.js';
import { showCreateListingPopup, showLoginPopup } from '../actions/popupActions.js';
import { fetchUserListings } from '../actions/listingsActions';
import logo from '../logo.webp'; 
import styles from './NavBar.module.css';

const NavBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userId = useSelector(state => state.auth.userId);

    const handleChangeView = (newView) => {
        dispatch(setView(newView));
    };

    const handleLogout = () => {
        dispatch(setUserLoggedOut());
    };

    const handleFetchUserListings = () => {
        if (userId) {
            console.log('userID is :', userId);
            dispatch(fetchUserListings(userId));
        }
    };

    return (
        <div className={styles.navbar}>
            {/* Left Buttons */}
            <div className={styles.navSection}>
                <button className={styles.navButton} onClick={() => handleChangeView('welcome')}>
                    Home
                </button>
                <button className={styles.navButton} onClick={() => handleChangeView('listings')}>
                    Listings
                </button>
            </div>

            {/* Website Name */}
                <div className={styles.titleContainer}>
                    <img src={logo} alt="Website Logo" className={styles.logo} />
                    <h1 className={styles.title}>Wolliz</h1>
                </div>

            {/* Right Buttons */}
            <div className={styles.navSection}>
                {isLoggedIn ? (
                    <>
                        <button className={styles.navButton} onClick={handleLogout}>Logout</button>
                        <button className={styles.navButton} onClick={() => dispatch(showCreateListingPopup())}>
                            Create Listing
                        </button>
                        <button className={styles.navButton} onClick={handleFetchUserListings}>My Listings</button>
                    </>
                ) : (
                    <button className={styles.navButton} onClick={() => dispatch(showLoginPopup())}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;




