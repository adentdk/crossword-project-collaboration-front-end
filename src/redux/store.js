import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistStore } from "redux-persist"

import storage from "redux-persist/es/storage"

import middlewares from './middleware';
import appReducer from './reducers';

const config = {
    key : "primary",
    blacklist: ['auth'],
    storage
}

let persistedReducer = persistCombineReducers(config,appReducer)

const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares))
const persistor =  persistStore(store)

export { store,persistor };