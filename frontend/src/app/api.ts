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
import { TeacherFormValues } from '../pages/register/TeacherForm';
import qs from 'qs';

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
        navigate(paths.error.forbidden._);
        break;

      case 404:
        navigate(paths.error.pageNotFound._);
        break;

      default:
        navigate(paths.error.internalServerError._);
        break;
    }
  }

  return result;
};


const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWrapper,
  endpoints: (builder) => ({
    getRegister: builder.query({
      query() {
        return {
          url: '/api/register/',
          method: 'POST'
        };
      }
    }),
    addUser: builder.mutation({
      query(user: TeacherFormValues) {
        return {
          url: '/api/register/',
          method: 'POST',
          body: qs.stringify({ ...user, 'teacher_signup-teacher_email': '' }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': 'This will have a cookie'
          }
        };
      }
    })
  })
});


export default api;
