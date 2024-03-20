import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userList } from "../../services/UserService";

export const getAllUser = createAsyncThunk("user/getAllUser", async (param) => {
  const response = await userList({
    page: param.page,
    param: param.param,
    size: param.size,
  });
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isloading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isloading = true;
    });
  },
});

export default userSlice.reducer;
