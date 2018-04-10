import { navigationMiddleware } from './Infrastructure/Navigation/Navigation';
import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from './Infrastructure/Navigation/Reducers';

const initialState = {};

const reducers = combineReducers({
    nav: routerReducer
});

let store: Store<any> = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk, navigationMiddleware)
);

export default store;
