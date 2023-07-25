import { api } from "../../api/apiSlice";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApi;
