import {
  ListArg,
  ListResult,
  Model,
  RetrieveArg,
  RetrieveResult,
  UpdateArg,
  UpdateResult,
  mapIdsToTag
} from 'codeforlife/lib/esm/helpers/rtkQuery';

import api from './api';

export type Class = Model<
  number,
  {
    name: string;
    teacher: number;
    classmatesDataViewable: boolean;
    alwaysAcceptRequests: boolean;
    acceptRequestsUntil: null | Date;
    isActive: boolean;
  },
  {
    accessCode: string;
    creationTime: null | Date;
    createdBy: number;
  }
>;

const classApi = api.injectEndpoints({
  endpoints: (build) => ({
    retrieveClass: build.query<
      RetrieveResult<Class>,
      RetrieveArg<Class, 'accessCode'>
    >({
      query: ({ accessCode }) => ({
        url: `classes/${accessCode}/`,
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result
        ? [
          'private',
          { type: 'class', id: result.id }
        ]
        : []
    }),
    listClasses: build.query<ListResult<Class>, ListArg>({
      query: () => ({
        url: 'classes/',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result
        ? [
          'private',
          ...mapIdsToTag(result, 'class')
        ]
        : []
    }),
    updateClass: build.mutation<
      UpdateResult<Class>,
      UpdateArg<Class, 'accessCode'>
    >({
      query: ({ accessCode, ...body }) => ({
        url: `classes/${accessCode}/`,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, arg) => result
        ? [{ type: 'class', id: result.id }]
        : []
    })
  })
});

export default classApi;
export const {
  useRetrieveClassQuery,
  useListClassesQuery,
  useUpdateClassMutation
} = classApi;
