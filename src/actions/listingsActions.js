import { fetchListings as fetchListingsApi } from '../js/api';
import { createListing as createListingsApi } from '../js/api';
import { fetchFilteredListings as fetchFilteredListingsApi } from '../js/api';
import { updateListing as updateListingApi } from '../js/api';


export const fetchListingsBegin = () => ({
    type: 'FETCH_LISTINGS_BEGIN'
});

export const fetchListingsSuccess = listings => ({
    type: 'FETCH_LISTINGS_SUCCESS',
    payload: listings
});

export const fetchListingsFailure = error => ({
    type: 'FETCH_LISTINGS_FAILURE',
    payload: { error }
});

export const setCurrentQuery = query => ({
    type: 'SET_CURRENT_QUERY',
    payload: query
});

export function fetchListings() {
    return dispatch => {
        dispatch(fetchListingsBegin());
        return fetchListingsApi()
        .then(response => {
            dispatch(fetchListingsSuccess(response.data));
            dispatch(setCurrentQuery(null)); // Set currentQuery to null for default listings

        })
        .catch(error => {
            dispatch(fetchListingsFailure(error.message));
        });
    };
}

export function fetchFilteredListings(filters) {
    return dispatch => {
        dispatch(fetchListingsBegin());
        return fetchFilteredListingsApi(filters)
        .then(response => {
            dispatch(fetchListingsSuccess(response.data));
            dispatch(setCurrentQuery(filters));
        })
        .catch(error => {
            dispatch(fetchListingsFailure(error.message));
        });
    };
}

export const createListingBegin = () => ({
    type: 'CREATE_LISTING_BEGIN'
});

export const createListingSuccess = listing => ({
    type: 'CREATE_LISTING_SUCCESS',
    payload: { listing }
});

export const createListingFailure = error => ({
    type: 'CREATE_LISTING_FAILURE',
    payload: { error }
});


export const createListing = (listingData, token) => {
    return dispatch => {
        dispatch(createListingBegin());
    
        createListingsApi(listingData, token)
            .then(response => {
                console.log("in createListing action the response is: ", response);
                dispatch(createListingSuccess(response.listing));
            })
            .catch(error => {
                const errorMsg = error.response ? error.response.data.message : error.message;
                dispatch(createListingFailure(errorMsg));
            })
    };
};



export const showListingDetails = (listing) => ({
    type: 'SHOW_LISTING_DETAILS',
    payload: listing
});

export const hideListingDetails = () => ({
    type: 'HIDE_LISTING_DETAILS'
});



export const updateListingBegin = () => ({
    type: 'UPDATE_LISTING_BEGIN'
});

export const updateListingSuccess = listing => ({
    type: 'UPDATE_LISTING_SUCCESS',
    payload: { listing }
});

export const updateListingFailure = error => ({
    type: 'UPDATE_LISTING_FAILURE',
    payload: { error }
});

export const updateListing = (formData, token) => {
    return async (dispatch, getState) => {
        dispatch(updateListingBegin());
        try {
            const response = await updateListingApi(formData, token);
            dispatch(updateListingSuccess(response));
            const { currentQuery } = getState().listings;
            if (currentQuery) {
                dispatch(fetchFilteredListings(currentQuery)); // Refetch the filtered listings
            } else {
                dispatch(fetchListings()); // Refetch the default listings
            }
        } catch (error) {
            dispatch(updateListingFailure(error.message));
        }
    };
};





