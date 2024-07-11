import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addProducts, deleteProducts, editProducts, getAllProducts } from "../../service/products.service";
// Async Thunks
// Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProducts.fulfilled, (state:any, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProducts.fulfilled, (state:any, action) => {
        const index = state.products.findIndex((item:any) => item.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProducts.fulfilled, (state:any, action) => {
        state.products = state.products.filter((item:any) => item.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;
