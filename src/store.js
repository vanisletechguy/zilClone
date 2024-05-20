import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import authReducer from './reducers/AuthReducer'; 
import listingsReducer from './reducers/listingsReducer';
import popupReducer from './reducers/popupReducer'; 
import viewReducer from './reducers/viewReducer'; 

const rootReducer = combineReducers({
    auth: authReducer,
    listings: listingsReducer,
    popup: popupReducer,
    view: viewReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) 
);

export default store;

