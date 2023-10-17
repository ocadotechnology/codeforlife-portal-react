import {
  ListArg,
  ListResult,
  Model,
  RetrieveArg,
  RetrieveResult,
  UpdateArg,
  UpdateResult,
  mapIdsToTag,
  searchParamsToString
} from 'codeforlife/lib/esm/helpers/rtkQuery';

import api from './api';

export type User = Model<
  number,
  {
    firstName: string;
    lastName: string;
    email: string;
  },
  {
    username: string;
    isActive: boolean;
    isStaff: boolean;
    dateJoined: Date;
    lastLogin: null | Date;
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
    password: string;
  }
>;

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    retrieveUser: build.query<RetrieveResult<User>, RetrieveArg<User>>({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => [
        'private',
        { type: 'user', id }
      ]
    }),
    listUsers: build.query<ListResult<User>, ListArg<{
      studentClass: string;
    }>>({
      query: (arg) => ({
        url: `users/${searchParamsToString(arg)}`,
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result
        ? [
          'private',
          ...mapIdsToTag(result, 'user')
        ]
        : []
    }),
    updateUser: build.mutation<UpdateResult<User>, UpdateArg<User, {
      currentPassword: string;
    }>>({
      query: ({ id, body }) => ({
        url: `users/${id}/`,
        method: 'PATCH',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, { id }) => error
        ? []
        : [{ type: 'user', id }]
    })
  })
});

export default userApi;
export const {
  useRetrieveUserQuery,
  useListUsersQuery,
  useUpdateUserMutation
} = userApi;
