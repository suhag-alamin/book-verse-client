import { api } from "../../api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: builder.query({
      query: () => `/wishlist`,
      providesTags: ["wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
} = wishlistApi;
