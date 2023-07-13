import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import qs from 'qs';

import { paths } from '../router';

const fetch = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL
});

const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (typeof args.body === 'object' &&
    args.headers !== undefined &&
    'Content-Type' in args.headers
  ) {
    switch (args.headers['Content-Type']) {
      case 'application/x-www-form-urlencoded':
        args.body = qs.stringify(args.body);
        break;
    }
  }

  const result = await fetch(args, api, extraOptions);

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

export default baseQuery;
