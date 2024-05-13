export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
export const HIDE_LOGIN_POPUP = 'HIDE_LOGIN_POPUP';
export const SHOW_CREATE_LISTING_POPUP = 'SHOW_CREATE_LISTING_POPUP';
export const HIDE_CREATE_LISTING_POPUP = 'HIDE_CREATE_LISTING_POPUP';

//import { SHOW_LOGIN_POPUP, HIDE_LOGIN_POPUP, SHOW_CREATE_LISTING_POPUP, HIDE_CREATE_LISTING_POPUP } from './actionTypes';

export const showLoginPopup = () => ({
    type: SHOW_LOGIN_POPUP
});

export const hideLoginPopup = () => ({
    type: HIDE_LOGIN_POPUP
});

export const showCreateListingPopup = () => ({
    type: SHOW_CREATE_LISTING_POPUP
});

export const hideCreateListingPopup = () => ({
    type: HIDE_CREATE_LISTING_POPUP
});

