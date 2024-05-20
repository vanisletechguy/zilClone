const initialState = {
    listings: [],
    loading: false,
    error: null,
    selectedListing: null, 
    currentQuery: null 
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
        case 'CREATE_LISTING_BEGIN':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'CREATE_LISTING_SUCCESS':
            return {
                ...state,
                loading: false,
                listings: [...state.listings, action.payload.listing]
            };
        case 'CREATE_LISTING_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case 'UPDATE_LISTING_SUCCESS':
            return {
                ...state,
                listings: state.listings.map(listing =>
                    listing.listing_id === action.payload.listing_id ? action.payload : listing
                )
            };
        case 'SHOW_LISTING_DETAILS':
            return {
                ...state,
                selectedListing: action.payload
            };
        case 'HIDE_LISTING_DETAILS':
            return {
                ...state,
                selectedListing: null
            };
        case 'SET_CURRENT_QUERY':
            return {
                ...state,
                currentQuery: action.payload
            };
        default:
            return state;
    }
}

export default listingsReducer;
