import api from './api';

export type Fields = Record<string, unknown>;

export type Model<
  ID,
  ReadAndWrite extends Fields = Fields,
  ReadOnly extends Fields = Fields,
  WriteOnly extends Fields = Fields
> = ReadAndWrite & {
  _readOnly: ReadOnly & { id: ID; };
  _writeOnly: WriteOnly;
};

export type ID<M extends Model<any>> = M['_readOnly']['id'];

export type TagArray<
  Type extends string,
  M extends Model<any>
> = Array<{
  type: Type;
  id: ID<M>;
}>;

// Create

export type CreateArg<M extends Model<any>> =
  Omit<M, '_readOnly' | '_writeOnly'> & M['_writeOnly'];

// Read

export type ReadResult<M extends Model<any>> =
  Omit<M, '_readOnly' | '_writeOnly'> & M['_readOnly'];

export interface ReadArg<M extends Model<any>> {
  id: ID<M>;
}

export interface ReadManyResult<M extends Model<any>> {
  count: number;
  offset: number;
  limit: number;
  maxLimit: number;
  data: Array<ReadResult<M>>;
}

export type ReadManyArg<SearchParams extends Fields = Fields> =
  null | Partial<SearchParams>;

// Update

export interface UpdateArg<
  M extends Model<any>,
  Required extends Fields = Fields
> {
  id: ID<M>;
  body: Partial<CreateArg<M>> & Required;
}

// Delete

export type DeleteArg<M extends Model<any>> = ReadArg<M>;

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

export function searchParamsToString(searchParams: ReadManyArg): string {
  if (searchParams !== null) {
    const _searchParams = Object.entries(searchParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]);

    if (_searchParams.length !== 0) {
      return `?${new URLSearchParams(_searchParams).toString()}`;
    }
  }

  return '';
}

export function mapIdsToTag<
  Type extends string,
  M extends Model<any>
>(
  result: ReadManyResult<M>,
  type: Type
): TagArray<Type, M> {
  return result.data.map(({ id }) => ({ type, id })) as TagArray<Type, M>;
}

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<ReadResult<User>, ReadArg<User>>({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => [
        'private',
        { type: 'user', id }
      ]
    }),
    getUsers: build.query<ReadManyResult<User>, ReadManyArg<{
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
    updateUser: build.mutation<null, UpdateArg<User, {
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
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation
} = userApi;
