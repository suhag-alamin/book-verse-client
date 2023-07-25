import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  user: {
    _id: string | null;
    email: string | null;
  };
  token: string | null;
}

const initialState: IAuthState = {
  user: {
    _id: null,
    email: null,
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { _id, email, accessToken } = action.payload;
      state.user._id = _id;
      state.user.email = email;
      state.token = accessToken;
    },
    logout: (state) => {
      state.user._id = null;
      state.user.email = null;
      state.token = null;

      // remove access token from local storage
      localStorage.removeItem("accessToken");

      // remove refresh token from cookie
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
