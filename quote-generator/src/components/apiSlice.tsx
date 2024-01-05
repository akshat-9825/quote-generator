import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QuoteType, RandomQuoteParam, TagType } from "./types";

export const Apis = createApi({
  reducerPath: "Apis",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.quotable.io/" }),
  endpoints: (builder) => ({
    getRandomQuote: builder.query<QuoteType[], RandomQuoteParam>({
      query: ({ tags }) => {
        const params = tags.length > 0 ? { tags } : {};
        return {
          url: "quotes/random",
          method: "GET",
          params,
        };
      },
    }),
    getQuoteById: builder.query<QuoteType, number>({
      query: (id: number) => `quotes/${id}`,
    }),
    getTags: builder.query<TagType[], null>({
      query: () => "tags",
    }),
  }),
});

export const { useGetRandomQuoteQuery, useGetTagsQuery } = Apis;
