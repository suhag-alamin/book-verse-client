import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    getBooks: builder.query({
      query: (limit) => (limit ? `/book?limit=${limit}` : "/book"),
      providesTags: ["book"],
    }),
    getAllBooks: builder.query({
      query: ({ page, limit, search, ...filterOptions }) =>
        search
          ? `/book?searchTerm=${search}`
          : Object.keys(filterOptions).length > 0
          ? `/book?${Object.keys(filterOptions)
              .map((key) => `${key}=${filterOptions[key]}`)
              .join("&")}`
          : `/book?page=${page}&limit=${limit}`,
      providesTags: ["book"],
    }),
    getAllBooksByUserId: builder.query({
      query: (id) => `/book/user/${id}`,
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["singleBook"],
    }),
    editBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["singleBook"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book", "singleBook"],
    }),
    getReviews: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: `/review`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["review"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
    }),
    getWishlist: builder.query({
      query: () => `/wishlist`,
    }),
    addToReadingList: builder.mutation({
      query: (data) => ({
        url: `/reading-list`,
        method: "POST",
        body: data,
      }),
    }),
    getReadingList: builder.query({
      query: () => `/reading-list`,
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetAllBooksQuery,
  useGetAllBooksByUserIdQuery,
  useGetSingleBookQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useAddToReadingListMutation,
  useGetReadingListQuery,
} = bookApi;
