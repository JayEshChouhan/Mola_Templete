import { combineReducers, createStore } from "@reduxjs/toolkit";
import { Reducer1,Reducer2 } from "./reducer/reducer";

const rootReducer = combineReducers({
    Reducer1,
    Reducer2,
})

const Store = createStore(
    rootReducer
);

export default Store;