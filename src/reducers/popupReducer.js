import { SHOW_LOGIN_POPUP, HIDE_LOGIN_POPUP, SHOW_CREATE_LISTING_POPUP, HIDE_CREATE_LISTING_POPUP } from '../actions/popupActions.js';

const initialState = {
    showLoginPopup: false,
    showCreateListingPopup: false
};

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOGIN_POPUP:
            return { ...state, showLoginPopup: true };
        case HIDE_LOGIN_POPUP:
            return { ...state, showLoginPopup: false };
        case SHOW_CREATE_LISTING_POPUP:
            return { ...state, showCreateListingPopup: true };
        case HIDE_CREATE_LISTING_POPUP:
            return { ...state, showCreateListingPopup: false };
        default:
            return state;
    }
};

export default popupReducer;
