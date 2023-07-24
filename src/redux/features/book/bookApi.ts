import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (limit) => (limit ? `/book?limit=${limit}` : "/book"),
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
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetAllBooksQuery, useGetSingleBookQuery } =
  bookApi;
