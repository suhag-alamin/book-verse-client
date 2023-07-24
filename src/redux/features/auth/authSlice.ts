import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  user: {
    email: string | null;
  };
  token: string | null;
}

const initialState: IAuthState = {
  user: {
    email: null,
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<string | null>) => {
    //   state.user.email = action.payload;
    // },
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.user.email = email;
      state.token = accessToken;
    },
    logout: (state) => {
      state.user.email = null;
      state.token = null;

      // remove access token from local storage
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
