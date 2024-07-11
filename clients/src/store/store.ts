import reducer from "./reducer/reducer";
import products from "./reducer/products";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer:{
        reducer,products
    }
})
export default store