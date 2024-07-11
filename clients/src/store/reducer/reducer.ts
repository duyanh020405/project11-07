import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addNewUser, blockUser, deleteUser, getAllUser } from "../../service/user.service";


const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    searchTerm: '',
    sortOrder: 'asc',
  },
  reducers: {
    setSearchTerm: (state: any, action) => {
      state.searchTerm = action.payload;
    },
    filterUsers: (state: any) => {
      state.filteredUsers = state.users.filter((user: any) =>
        user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    resetSearch: (state: any) => {
      state.searchTerm = '';
      state.filteredUsers = state.users;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredUsers = [...state.filteredUsers].sort((a: any, b: any) => {
        if (state.sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {})
      .addCase(addNewUser.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, (state, action) => {})
      .addCase(getAllUser.pending, (state) => {})
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload; // cập nhật filteredUsers khi lấy tất cả người dùng
      })
      .addCase(deleteUser.fulfilled, (state:any, action) => {
        state.users = state.users.filter((item:any) => item.id !== action.payload);
        state.filteredUsers = state.filteredUsers.filter((item:any) => item.id !== action.payload);
      })
      .addCase(getAllUser.rejected, (state, action) => {})
      .addCase(blockUser.fulfilled, (state: any, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload; // cập nhật filteredUsers sau khi chặn người dùng
      })

  },
});

export default userSlice.reducer;
export const { setSearchTerm, filterUsers, resetSearch ,setSortOrder } = userSlice.actions;
