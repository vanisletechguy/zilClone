const initialState = {
    currentView: 'listings' // Default view
};

const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIEW':
            return {
                ...state,
                currentView: action.payload
            };
        default:
            return state;
    }
}

export default viewReducer;
