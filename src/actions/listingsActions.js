import axios from 'axios';

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
        return axios.get("/api/listings")
        .then(response => {
            dispatch(fetchListingsSuccess(response.data.listings));
            return response.data.listings;
        })
        .catch(error => {
            dispatch(fetchListingsFailure(error.message));
        });
    };
}

