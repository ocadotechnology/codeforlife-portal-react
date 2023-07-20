import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import qs from 'qs';

import { snakeCaseToCamelCase } from 'codeforlife/lib/esm/helpers';

import { paths } from '../router';

const fetch = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL
});

const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Check if the request has a body and it's content type is specified.
  if (typeof args.body === 'object' &&
    args.headers !== undefined &&
    'Content-Type' in args.headers
  ) {
    // Stringify the request body based on it's content type.
    switch (args.headers['Content-Type']) {
      case 'application/x-www-form-urlencoded':
        args.body = qs.stringify(args.body);
        break;
      case 'application/json':
        args.body = JSON.stringify(args.body);
        break;
    }
  }

  // Send the HTTP request and fetch the response.
  const result = await fetch(args, api, extraOptions);

  // Handle error responses.
  if (result.error && result.error.status !== 400) {
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

  // Parse the response's data from snake_case to camelCase.
  if (typeof result.data === 'object' && result.data !== null) {
    snakeCaseToCamelCase(result.data);
  }

  return result;
};

export default baseQuery;
