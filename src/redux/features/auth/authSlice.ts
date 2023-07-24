import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  user: {
    email: string | null;
  };
  token: string | null;
  isLoading: boolean;
}

const initialState: IAuthState = {
  user: {
    email: null,
  },
  token: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.user.email = email;
      state.token = accessToken;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user.email = null;
      state.token = null;
      state.isLoading = false;

      // remove access token from local storage
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
