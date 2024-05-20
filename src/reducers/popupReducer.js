import { SHOW_LOGIN_POPUP, HIDE_LOGIN_POPUP, SHOW_CREATE_LISTING_POPUP, 
    HIDE_CREATE_LISTING_POPUP, SHOW_LISTING_DETAILS_POPUP,
    HIDE_LISTING_DETAILS_POPUP, SHOW_EDIT_LISTING_POPUP,
    HIDE_EDIT_LISTING_POPUP } from '../actions/popupActions.js';

const initialState = {
    showCreateListingPopup: false,
    showEditListingPopup: false,
    showListingDetailsPopup: false,
    showLoginPopup: false
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
        case SHOW_LISTING_DETAILS_POPUP:
            return { ...state, showListingDetailsPopup: true };
        case HIDE_LISTING_DETAILS_POPUP:
            return { ...state, showListingDetailsPopup: false };
        case SHOW_EDIT_LISTING_POPUP:
            return { ...state, showEditListingPopup: true };
        case HIDE_EDIT_LISTING_POPUP:
            return { ...state, showEditListingPopup: false };
        default:
            return state;
    }
};

export default popupReducer;
