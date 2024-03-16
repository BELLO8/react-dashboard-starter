// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

const initialUser = () => {
  const item = window.localStorage.getItem("userProfil");
  return item ? JSON.parse(item) : {};
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userProfil: initialUser(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userProfil = action.payload;
      state["accessToken"] = action.payload["accessToken"];
      localStorage.setItem("userProfil", JSON.stringify(action.payload));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
    },
    handleLogout: (state) => {
      state.userData = {};
      state["accessToken"] = null;
      localStorage.removeItem("userProfil");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
