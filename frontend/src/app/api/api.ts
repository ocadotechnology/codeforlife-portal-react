import { createApi } from '@reduxjs/toolkit/query/react';

import { TAG_TYPES, baseQuery } from 'codeforlife/lib/esm/api';

const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [...TAG_TYPES, 'studentRequest'],
  endpoints: () => ({})
});

export default api;
