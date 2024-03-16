import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "OverLady",
  user: [],
  order: [],
};

export const userSlice = createSlice({
  name: "payload",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = "Login success";
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "Logout success";
      localStorage.clear();
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
