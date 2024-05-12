const initialState = {
    isLoggedIn: false,
    token: null,
    userDetails: {},
    userId: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                userDetails: action.payload.userDetails,
                // userId: action.payload.userDetails.userId  
                userId: action.payload.userId  
            };
        case 'SET_USER_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userDetails: {},
                userId: null
            };
        default:
            return state;
    }
}

export default authReducer;
