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
  tagModels
} from 'codeforlife/lib/esm/helpers/rtkQuery';

import api from './api';

export type School = Model<
  number,
  {
    name: string;
    postcode: null | string;
    country: string;
    county: null | string;
    isActive: boolean;
  },
  {
    creationTime: null | Date;
  }
>;

const schoolApi = api.injectEndpoints({
  endpoints: (build) => ({
    createSchool: build.query<
      CreateResult<School>,
      CreateArg<School>
    >({
      query: (body) => ({
        url: 'schools/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      providesTags: (result, error, data) => result && !error
        ? [
          'private',
          { type: 'school', id: result.id }
        ]
        : []
    }),
    retrieveSchool: build.query<
      RetrieveResult<School>,
      RetrieveArg<School>
    >({
      query: ({ id }) => ({
        url: `schools/${id}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => result && !error
        ? [
          'private',
          { type: 'school', id }
        ]
        : []
    }),
    listSchools: build.query<
      ListResult<School>,
      ListArg
    >({
      query: () => ({
        url: 'schools/',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result && !error
        ? [
          'private',
          ...tagModels(result, 'school')
        ]
        : []
    }),
    updateSchool: build.mutation<
      UpdateResult<School>,
      UpdateArg<School>
    >({
      query: ({ id, ...body }) => ({
        url: `schools/${id}/`,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, { id }) => !error
        ? [{ type: 'school', id }]
        : []
    }),
    destroySchool: build.mutation<
      DestroyResult,
      DestroyArg<School>
    >({
      query: ({ id }) => ({
        url: `schools/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { id }) => !error
        ? [{ type: 'school', id }]
        : []
    })
  })
});

export default schoolApi;
export const {
  useCreateSchoolQuery,
  useRetrieveSchoolQuery,
  useListSchoolsQuery,
  useUpdateSchoolMutation,
  useDestroySchoolMutation
} = schoolApi;
