import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProducts:any = createAsyncThunk(
    "products/addProduct",
    async (item: any) => {
      const response = await axios.post("http://localhost:8080/products", item);
      window.alert("Tạo sản phẩm mới thành công");
      return response.data;
    }
  );
  
  export const getAllProducts:any = createAsyncThunk(
    "products/getAllProducts",
    async () => {
      const response = await axios.get("http://localhost:8080/products");
      return response.data;
    }
  );
  
  export const editProducts:any = createAsyncThunk(
    "products/editProduct",
    async (item: any) => {
      const response = await axios.patch(`http://localhost:8080/products/${toNumber(item.id)}`, item);
      return response.data;
    }
  );
  
  export const deleteProducts:any = createAsyncThunk(
    "products/deleteProduct",
    async (id: number) => {
      await axios.delete(`http://localhost:8080/products/${id}`);
      return id;
    }
  );
  
  // Utility function to convert value to number
  const toNumber = (value: any) => {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error("Cannot convert value to number! Please use a valid type.");
    }
    return num;
  };