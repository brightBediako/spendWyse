import { createSlice } from "@reduxjs/toolkit";

// initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    // token: null,
  },
  // reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // logout action
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
// export reducer
const authReducer = authSlice.reducer;
export default authReducer;
