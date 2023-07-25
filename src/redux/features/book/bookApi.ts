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
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
} = bookApi;
