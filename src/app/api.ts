import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';

import { paths } from './router';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL
});

const baseQueryWrapper: BaseQueryFn<
  string | FetchArgs, unknown, FetchBaseQueryError // eslint-disable-line @typescript-eslint/indent
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const navigate = useNavigate();

  if (result.error) {
    switch (result.error.status) {
      case 403:
        navigate(paths.forbidden);
        break;

      case 404:
        navigate(paths.pageNotFound);
        break;

      default:
        navigate(paths.internalServerError);
        break;
    }
  }

  return result;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWrapper,
  endpoints: () => ({})
});

export default api;
