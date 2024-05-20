export const setUserLoggedIn = (token, userId, email) => ({
    type: 'SET_USER_LOGGED_IN',
    payload: { token, userId, email }
});

export const setUserLoggedOut = () => ({
    type: 'SET_USER_LOGGED_OUT'
});
