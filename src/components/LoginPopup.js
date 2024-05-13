import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedIn, setUserLoggedOut } from '../actions/authActions'; 
import { login, register } from '../js/api'; 
import { hideLoginPopup } from '../actions/popupActions.js';

const LoginPopup = ({ onClose, onUserLoggedIn }) => {
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
                //console.log('Login Success:', data);
                //dispatch(setUserLoggedIn(data.yourToken, {email, userId}));
                dispatch(setUserLoggedIn(data.yourToken, {email, userId: data.userId}));
                dispatch(hideLoginPopup());
                    //onClose();
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
                //dispatch(setUserLoggedIn(data.yourToken, {email, userId));
                dispatch(setUserLoggedIn(data.yourToken, {email, userId: data.userId}));
                dispatch(hideLoginPopup());
                //console.log('Registration Success:', data);
                    //onClose();
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
        <div style={{ position: 'fixed', top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', padding: '20px', 
            backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>


            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {isRegistering ? (
                    <>
                        <input type="text" 
                            placeholder="First Name" value={firstName} 
                            onChange={e => setFirstName(e.target.value)} />
                        <input type="text" 
                            placeholder="Last Name" value={lastName} 
                            onChange={e => setLastName(e.target.value)} />
                    </>
                ) : null}
                <input type="email" 
                    placeholder="Email" value={email} 
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" 
                    placeholder="Password" value={password} 
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>

            <button onClick={switchMode}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
            <button onClick={() => dispatch(hideLoginPopup())}>Close</button>

        </div>
    );
};

export default LoginPopup;
