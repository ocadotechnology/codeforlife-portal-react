import {
  BulkCreateArg,
  BulkCreateResult,
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
  searchParamsToString,
  tagData
} from 'codeforlife/lib/esm/helpers/rtkQuery';

import api from './api';

export type User = Model<
  number,
  {
    firstName: string;
    lastName: string;
    email: string;
    password: null | string;
    student: null | {
      classField: null | number;
      loginId: null | string;
      user: number;
      newUser: null | number;
      pendingClassRequest: null | number;
      blockedTime: null | Date;
    };
    teacher: null | {
      user: number;
      newUser: null | number;
      school: null | number;
      isAdmin: boolean;
      blockedTime: null | Date;
      invitedBy: null | number;
    };
  },
  {
    username: string;
    isActive: boolean;
    isStaff: boolean;
    dateJoined: Date;
    lastLogin: null | Date;
  }
>;

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.query<
      CreateResult<User>,
      CreateArg<User>
    >({
      query: (body) => ({
        url: 'users/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      providesTags: (result, error, data) => result && !error
        ? [
          'private',
          { type: 'user', id: result.id }
        ]
        : []
    }),
    bulkCreateUsers: build.query<
      BulkCreateResult<User>,
      BulkCreateArg<User>
    >({
      query: (body) => ({
        url: 'users/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      providesTags: (result, error, arg) => result && !error
        ? [
          'private',
          ...tagData(result, 'user')
        ]
        : []
    }),
    retrieveUser: build.query<
      RetrieveResult<User>,
      RetrieveArg<User>
    >({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => result && !error
        ? [
          'private',
          { type: 'user', id }
        ]
        : []
    }),
    listUsers: build.query<
      ListResult<User>,
      ListArg<{ studentClass: string; }>
    >({
      query: (arg) => ({
        url: `users/${searchParamsToString(arg)}`,
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result && !error
        ? [
          'private',
          ...tagData(result, 'user')
        ]
        : []
    }),
    updateUser: build.mutation<
      UpdateResult<User>,
      UpdateArg<User> & { currentPassword?: string; }
    >({
      query: ({ id, ...body }) => ({
        url: `users/${id}/`,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, { id }) => !error
        ? [{ type: 'user', id }]
        : []
    }),
    destroyUser: build.mutation<
      DestroyResult,
      DestroyArg<User>
    >({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { id }) => !error
        ? [{ type: 'user', id }]
        : []
    })
  })
});

export default userApi;
export const {
  useLazyCreateUserQuery,
  useLazyBulkCreateUsersQuery,
  useRetrieveUserQuery,
  useListUsersQuery,
  useUpdateUserMutation,
  useDestroyUserMutation
} = userApi;
