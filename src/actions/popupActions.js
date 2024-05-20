export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
export const HIDE_LOGIN_POPUP = 'HIDE_LOGIN_POPUP';
export const SHOW_CREATE_LISTING_POPUP = 'SHOW_CREATE_LISTING_POPUP';
export const HIDE_CREATE_LISTING_POPUP = 'HIDE_CREATE_LISTING_POPUP';
export const SHOW_LISTING_DETAILS_POPUP = 'SHOW_LISTING_DETAILS_POPUP';
export const HIDE_LISTING_DETAILS_POPUP = 'HIDE_LISTING_DETAILS_POPUP';
export const SHOW_EDIT_LISTING_POPUP = 'SHOW_EDIT_LISTING_POPUP';
export const HIDE_EDIT_LISTING_POPUP = 'HIDE_EDIT_LISTING_POPUP';


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

export const showListingDetailsPopup = () => ({
    type: SHOW_LISTING_DETAILS_POPUP
});

export const hideListingDetailsPopup = () => ({
    type: HIDE_LISTING_DETAILS_POPUP
});

export const showEditListingPopup = () => ({
    type: SHOW_EDIT_LISTING_POPUP
});

export const hideEditListingPopup = () => ({
    type: HIDE_EDIT_LISTING_POPUP
});
