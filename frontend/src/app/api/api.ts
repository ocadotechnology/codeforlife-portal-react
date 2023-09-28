import { createApi } from '@reduxjs/toolkit/query/react';

import { tagTypes, baseQuery } from 'codeforlife/lib/esm/api';

const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [...tagTypes, 'studentRequest'],
  endpoints: () => ({})
});

export default api;
