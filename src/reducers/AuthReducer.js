const initialState = {
    isLoggedIn: false,
    token: null,
    userDetails: {}
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                userDetails: action.payload.userDetails
            };
        case 'SET_USER_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userDetails: {}
            };
        default:
            return state;
    }
}

export default authReducer;
