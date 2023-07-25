import { api } from "../../api/apiSlice";

const readingListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToReadingList: builder.mutation({
      query: (data) => ({
        url: `/reading-list`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["readingList"],
    }),
    getReadingList: builder.query({
      query: () => `/reading-list`,
      providesTags: ["readingList"],
    }),
    updateReadingListStatus: builder.mutation({
      query: (id) => ({
        url: `/reading-list/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["readingList"],
    }),
    deleteReadingList: builder.mutation({
      query: (id) => ({
        url: `/reading-list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["readingList"],
    }),
  }),
});

export const {
  useAddToReadingListMutation,
  useGetReadingListQuery,
  useUpdateReadingListStatusMutation,
  useDeleteReadingListMutation,
} = readingListApi;
