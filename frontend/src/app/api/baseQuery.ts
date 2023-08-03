import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import {
  QueryReturnValue
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import Cookies from 'js-cookie';
import qs from 'qs';

import {
  camelCaseToSnakeCase,
  snakeCaseToCamelCase
} from 'codeforlife/lib/esm/helpers';

import { paths } from '../router';

type Result = QueryReturnValue<
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>;

const fetch = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL
});

function setCookieRequestHeader(args: FetchArgs): void {
  // Cookies included in every request if defined.
  const cookie = [
    'sessionid'
  ].map((name) => Cookies.get(name))
    .filter((cookie) => cookie !== undefined)
    .join(';');

  // If any cookie was defined, include it in the header.
  if (cookie !== '') {
    if (args.headers === undefined) {
      args.headers = { Cookie: cookie };
    } else if ('Cookie' in args.headers) {
      if (args.headers.Cookie === undefined || args.headers.Cookie === '') {
        args.headers.Cookie = cookie;
      } else {
        args.headers.Cookie += `;${cookie}`;
      }
    } else {
      Object.defineProperty(args.headers, 'Cookie', { value: cookie });
    }
  }
}

function parseRequestBody(args: FetchArgs): void {
  // Check if the request has a body and its content type is specified.
  if (typeof args.body === 'object' && args.body !== null) {
    camelCaseToSnakeCase(args.body);

    if (args.headers !== undefined && 'Content-Type' in args.headers) {
      // Stringify the request body based on its content type.
      switch (args.headers['Content-Type']) {
        case 'application/x-www-form-urlencoded':
          args.body = qs.stringify(args.body);
          break;
        case 'application/json':
          args.body = JSON.stringify(args.body);
          break;
      }
    }
  }
}

function handleResponseError(result: Result): void {
  // Handle error responses.
  if (result.error !== undefined) {
    // Parse the error's data from snake_case to camelCase.
    if (result.error.status === 400 &&
      typeof result.error.data === 'object' &&
      result.error.data !== null
    ) {
      snakeCaseToCamelCase(result.error.data);
    } else {
      // Catch-all error pages by status-code.
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
  }
}

function parseResponseBody(result: Result): void {
  // Parse the response's data from snake_case to camelCase.
  if (typeof result.data === 'object' && result.data !== null) {
    snakeCaseToCamelCase(result.data);
  }
}

const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  setCookieRequestHeader(args);

  parseRequestBody(args);

  // Send the HTTP request and fetch the response.
  const result = await fetch(args, api, extraOptions);

  handleResponseError(result);

  parseResponseBody(result);

  return result;
};

export default baseQuery;
