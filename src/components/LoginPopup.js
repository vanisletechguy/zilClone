import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../actions/authActions';
import { login, register } from '../js/api';
import { hideLoginPopup } from '../actions/popupActions.js';
import styles from './LoginPopup.module.css';

const LoginPopup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = await login(email, password);
            if (data && data.yourToken) {
                dispatch(setUserLoggedIn(data.yourToken, data.userId, email) );
                dispatch(hideLoginPopup());
            } else {
                throw new Error('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            setErrorMessage(error.message || 'Failed to login');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const data = await register(firstName, lastName, email, password);
            if (data && data.yourToken) {
                dispatch(setUserLoggedIn(data.yourToken, { email, userId: data.userId }));
                dispatch(hideLoginPopup());
            } else {
                throw new Error('Registration failed: No token received');
            }
        } catch (error) {
            console.error('Registration Error:', error.message);
            setErrorMessage(error.message || 'Failed to register');
        }
    };

    const switchMode = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage(''); // Reset error message on mode switch
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popupContainer}>
                <form onSubmit={isRegistering ? handleRegister : handleLogin} className={styles.form}>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                className={styles.inputField}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className={styles.inputField}
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={styles.inputField}
                    />
                    <button type="submit" className={styles.submitButton}>
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <button onClick={switchMode} className={styles.switchButton}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </button>
                <button onClick={() => dispatch(hideLoginPopup())} className={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default LoginPopup;

