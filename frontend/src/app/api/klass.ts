import {
  CreateArg,
  CreateResult,
  DestroyArg,
  DestroyResult,
  ListArg,
  ListResult,
  Model,
  RetrieveArg,
  RetrieveResult,
  UpdateArg,
  UpdateResult,
  tagData
} from 'codeforlife/lib/esm/helpers/rtkQuery';

import api from './api';

export type Class = Model<
  number,
  {
    name: string;
    teacher: number;
    classmatesDataViewable?: boolean;
    alwaysAcceptRequests?: boolean;
    acceptRequestsUntil: null | Date;
    isActive?: boolean;
  },
  {
    accessCode: string;
    creationTime: null | Date;
    createdBy: number;
  }
>;

const classApi = api.injectEndpoints({
  endpoints: (build) => ({
    createClass: build.query<
      CreateResult<Class>,
      CreateArg<Class>
    >({
      query: (body) => ({
        url: 'classes/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      providesTags: (result, error, data) => result && !error
        ? [
          'private',
          { type: 'class', id: result.accessCode }
        ]
        : []
    }),
    retrieveClass: build.query<
      RetrieveResult<Class>,
      RetrieveArg<Class, 'accessCode'>
    >({
      query: ({ accessCode }) => ({
        url: `classes/${accessCode}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { accessCode }) => result && !error
        ? [
          'private',
          { type: 'class', id: accessCode }
        ]
        : []
    }),
    listClasses: build.query<
      ListResult<Class>,
      ListArg
    >({
      query: () => ({
        url: 'classes/',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result && !error
        ? [
          'private',
          ...tagData(result, 'class', 'accessCode')
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
      invalidatesTags: (result, error, { accessCode }) => !error
        ? [{ type: 'class', id: accessCode }]
        : []
    }),
    destroyClass: build.mutation<
      DestroyResult,
      DestroyArg<Class, 'accessCode'>
    >({
      query: ({ accessCode }) => ({
        url: `classes/${accessCode}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { accessCode }) => !error
        ? [{ type: 'school', id: accessCode }]
        : []
    })
  })
});

export default classApi;
export const {
  useLazyCreateClassQuery,
  useRetrieveClassQuery,
  useListClassesQuery,
  useUpdateClassMutation,
  useDestroyClassMutation
} = classApi;
