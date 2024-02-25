import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FIREBASE_DB_BASE_URL,
  }),
  endpoints: (builder) => ({
    getQuizLst: builder.query({
      query: () => ({
        url: "/questions.json",
        method: "GET",
        headers: {},
      }),
      transformResponse: (response) => response,
    }),
    adminLogin: builder.mutation({
      query: ({ pageNumber, raffleID }) => ({
        url: `/Raffle/GetWinner?raffleId=${raffleID}&page=${pageNumber}`,
        method: "POST",
        headers: {},
      }),
      transformResponse: (response) => response,
    }),
    createNewQuiz: builder.mutation({
      query: ({ socialCode, pageNumber, raffleID }) => ({
        url: `/Raffle/GetWinner?raffleId=${raffleID}&page=${pageNumber}&socialCode=${socialCode}`,
        method: "POST",
        headers: {},
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetQuizLstQuery } = firebaseApi;
export default firebaseApi;
