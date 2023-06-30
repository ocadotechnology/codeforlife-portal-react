import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';

import { paths } from './router';

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_BASE_URL
  baseUrl: 'http://localhost:8000/'
});

const baseQueryWrapper: BaseQueryFn<
  string | FetchArgs, unknown, FetchBaseQueryError // eslint-disable-line @typescript-eslint/indent
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    switch (result.error.status) {
      case 403:
        window.location.href = paths.error.forbidden._;
        break;

      case 404:
        window.location.href = paths.error.pageNotFound._;
        break;

      default:
        window.location.href = paths.error.internalServerError._;
        break;
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWrapper,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => ({
        url: 'news_signup/',
        method: 'POST',
        body: payload
      })
    })
  })
});

export const {
  useSignUpMutation
} = api;
