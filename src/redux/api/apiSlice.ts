import { FetchArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { logout, setCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://book-verse-api.vercel.app/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

interface RefreshTokenResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    // Add other properties if there are any
  };
}

const isRefreshTokenResponse = (data: any): data is RefreshTokenResponse => {
  if (!data) return false;
  return (
    "data" in data &&
    "statusCode" in data &&
    "success" in data &&
    "message" in data
  );
};

const baseQueryWithReAuth = async (
  args: FetchArgs | string,
  api: any,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403 || result?.error?.status === 500) {
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.error?.status === 403) {
      api.dispatch(logout());
      toast.error("Please login again");
    }

    if (isRefreshTokenResponse(refreshResult?.data)) {
      const data: RefreshTokenResponse = refreshResult.data;

      const user = api.getState().auth.user;

      api.dispatch(
        setCredentials({
          email: user?.email,
          accessToken: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ["user"],
});
