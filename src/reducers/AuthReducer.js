const initialState = {
    isLoggedIn: false,
    token: null,
    email: null,
    userId: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                email: action.payload.email,
                userId: action.payload.userId  
            };
        case 'SET_USER_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                email: null,
                userId: null
            };
        default:
            return state;
    }
}

export default authReducer;
