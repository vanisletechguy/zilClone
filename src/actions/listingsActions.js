import { fetchListings as fetchListingsApi } from '../js/api';
import { createListing as createListingsApi } from '../js/api';


export const fetchListingsBegin = () => ({
    type: 'FETCH_LISTINGS_BEGIN'
});

export const fetchListingsSuccess = listings => ({
    type: 'FETCH_LISTINGS_SUCCESS',
    payload: { listings }
});

export const fetchListingsFailure = error => ({
    type: 'FETCH_LISTINGS_FAILURE',
    payload: { error }
});

export function fetchListings() {
    return dispatch => {
        dispatch(fetchListingsBegin());
        return fetchListingsApi()
        .then(response => {
            dispatch(fetchListingsSuccess(response.data.listings));
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



/*
export const createListing = (listingData, token) => {
    return dispatch => {
        dispatch({ type: 'CREATE_LISTING_BEGIN' });
        axios.post(`${API_URL}/listings/create`, listingData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            dispatch({ type: 'CREATE_LISTING_SUCCESS', payload: response.data });
            // Optionally handle response data, e.g., displaying a message or redirecting
        })
        .catch(error => {
            dispatch({ type: 'CREATE_LISTING_FAILURE', payload: error });
            // Optionally handle error, e.g., displaying error messages
            console.error("Error creating listing:", error);
        });
    };
};
*/



export const createListing = (listingData, token, userId) => {
    return dispatch => {
        /*
        dispatch(createListingBegin());
        return createListingsApi(listingData, token)
        .then(response => {
            dispatch(createListingSuccess(response.listing));
            return response.listing;
        })
        .catch(error => {
            dispatch(createListingFailure(error.message));
        });
        */

        dispatch(createListingBegin());
        createListingsApi(listingData, token)
            .then(response => {
                // Assuming the API returns the newly created listing object in the response body
                dispatch(createListingSuccess(response.listing));
            })
            .catch(error => {
                // Make sure to handle and dispatch any error that comes from the API
                const errorMsg = error.response ? error.response.data.message : error.message;
                dispatch(createListingFailure(errorMsg));
            });


    };

};


