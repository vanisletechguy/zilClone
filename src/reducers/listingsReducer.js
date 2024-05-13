const initialState = {
    listings: [],
    loading: false,
    error: null
};

function listingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_LISTINGS_BEGIN':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_LISTINGS_SUCCESS':
            return {
                ...state,
                loading: false,
                listings: action.payload
            };
        case 'FETCH_LISTINGS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                listings: []
            };
        default:
            return state;
    }
}

export default listingsReducer;
