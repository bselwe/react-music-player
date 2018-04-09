import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import { Provider } from "react-redux";
import { handleActions } from "redux-actions";

const initialState: any = {};
let store: Store<any>;
const reducers = handleActions({}, initialState);

store = createStore(
    reducers
);

export default store;
