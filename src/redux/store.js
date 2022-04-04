import { combineReducers, createStore } from "@reduxjs/toolkit";
import { Reducer1,Reducer2,CartReducer,WishlistReducer } from "./reducer/reducer";

const rootReducer = combineReducers({
    Reducer1,
    Reducer2,
    CartReducer,
    WishlistReducer,
})

const Store = createStore(
    rootReducer
);

export default Store;