import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (limit) => (limit ? `/book?limit=${limit}` : "/book"),
    }),
    getBooksWithPagination: builder.query({
      query: ({ page, limit }) => `/book?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBooksWithPaginationQuery } = bookApi;
