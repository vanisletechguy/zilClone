export const setUserLoggedIn = (token, userDetails) => ({
    type: 'SET_USER_LOGGED_IN',
    payload: { token, userDetails }
});

export const setUserLoggedOut = () => ({
    type: 'SET_USER_LOGGED_OUT'
});
