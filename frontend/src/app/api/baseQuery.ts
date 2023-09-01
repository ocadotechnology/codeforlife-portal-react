import {
  QueryReturnValue
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery
} from '@reduxjs/toolkit/query';
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
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  credentials: 'include'
});

function parseRequestBody(args: FetchArgs): void {
  // Check if the request has a body and its content type is specified.
  if (typeof args.body !== 'object' || args.body === null) return;

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

function injectCsrfToken(args: FetchArgs): void {
  // Check if the request method is safe.
  // https://datatracker.ietf.org/doc/html/rfc9110.html#section-9.2.1
  if (args.method !== undefined &&
    ['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(args.method)
  ) return;

  // https://docs.djangoproject.com/en/3.2/ref/csrf/
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken === undefined) return;

  // Inject the CSRF token.
  args.body = {
    ...(typeof args.body !== 'object' || args.body === null ? {} : args.body),
    csrfmiddlewaretoken: csrfToken
  };
}

function handleResponseError(result: Result): void {
  // Check if errors.
  if (result.error === undefined) return;

  // TODO: support navigate hook outside components is possible.
  // https://stackoverflow.com/a/70000286

  // Parse the error's data from snake_case to camelCase.
  if (result.error.status === 400 &&
    typeof result.error.data === 'object' &&
    result.error.data !== null
  ) {
    snakeCaseToCamelCase(result.error.data);
  } else if (result.error.status === 401) {
    // TODO: redirect to appropriate login page based on user type.
    window.location.href = paths.login.teacher._;
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

function parseResponseBody(result: Result): void {
  // Parse the response's data from snake_case to camelCase.
  if (typeof result.data !== 'object' || result.data === null) return;

  snakeCaseToCamelCase(result.data);
}

const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  injectCsrfToken(args);

  parseRequestBody(args);

  // Send the HTTP request and fetch the response.
  const result = await fetch(args, api, extraOptions);

  handleResponseError(result);

  parseResponseBody(result);

  return result;
};

export default baseQuery;
