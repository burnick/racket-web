import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl = process.env.API_URL ?? 'https://api.racket.ph';
import { JobProps } from 'types';

export const JobsAPI = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) =>
      headers.set('Authorization', `bearer ${process.env.APP_SECRET}`),
  }),
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobProps, void>({
      query: () => `jobs`,

      // credentials: 'include', // This allows server to set cookies
      providesTags: [{ type: 'Jobs', id: 'JobList' }],
    }),
  }),
});
