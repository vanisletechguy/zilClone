import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import listingsReducer from './reducers/listingsReducer';
import authReducer from './reducers/AuthReducer'; 

const rootReducer = combineReducers({
    listings: listingsReducer,
    auth: authReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) 
);

export default store;

