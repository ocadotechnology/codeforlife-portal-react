import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import {
  endpoints,
  tagTypes
} from 'codeforlife/lib/esm/api';
import {
  FetchBaseQuery,
  fetch,
  handleResponseError,
  injectCsrfToken,
  parseRequestBody,
  parseResponseBody
} from 'codeforlife/lib/esm/api/baseQuery';

import {
  SSO_SERVICE_NAME
} from './env';

// TODO: remove this hot switching code and migrate login pages to SSO service.
const ssoFetch = fetchBaseQuery({
  baseUrl: `http://localhost:8001/${SSO_SERVICE_NAME}/api/`,
  credentials: 'include'
});

const baseQuery: FetchBaseQuery = async (args, api, extraOptions) => {
  const isLoginRequest = args.url.startsWith('session/login/');

  if (isLoginRequest) {
    await injectCsrfToken(ssoFetch, args, api, SSO_SERVICE_NAME);
  } else {
    await injectCsrfToken(fetch, args, api);
  }

  parseRequestBody(args);

  // Send the HTTP request and fetch the response.
  const result = await (isLoginRequest ? ssoFetch : fetch)(args, api, extraOptions);

  handleResponseError(result);

  parseResponseBody(result);

  return result;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [...tagTypes, 'studentRequest'],
  endpoints: (build) => ({
    ...endpoints(build)
  })
});

export default api;
export const {
  useLogoutMutation
} = api;
