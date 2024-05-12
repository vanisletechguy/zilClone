import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import listingsReducer from './reducers/listingsReducer';
import authReducer from './reducers/AuthReducer'; 
import viewReducer from './reducers/viewReducer'; 

const rootReducer = combineReducers({
    listings: listingsReducer,
    auth: authReducer,
    view: viewReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) 
);

export default store;

