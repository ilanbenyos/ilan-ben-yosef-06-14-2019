import { createStore, applyMiddleware, compose , combineReducers } from "redux";
import rootReducer from "./reducers";
import {saveFavorite, initFavorites } from "./middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(
      saveFavorite,
      initFavorites,
      thunk))
);
export default store;
