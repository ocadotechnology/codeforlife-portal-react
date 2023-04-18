import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://official-joke-api.appspot.com/'
});

const baseQueryWrapper: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const navigate = useNavigate();

  if (result.error) {
    switch (result.error.status) {
      case 403:
        navigate('/403');
        break;

      case 404:
        navigate('/404');
        break;

      default:
        navigate('/500');
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
