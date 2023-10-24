import api from './api';

export type LoginQuery = {
  email: string;
  password: string;
} | {
  username: string;
  password: string;
  classId: string;
} | {
  userId: number;
  loginId: string;
} | {
  otp: string;
} | {
  token: string;
};

// TODO: move this to sso service.
const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<null, LoginQuery>({
      query: (body) => {
        let form: string;
        if ('email' in body) form = 'email';
        else if ('username' in body) form = 'username';
        else if ('userId' in body) form = 'user-id';
        else if ('otp' in body) form = 'otp';
        else if ('token' in body) form = 'otp-bypass-token';
        else throw new Error('form could not be selected');

        return {
          url: `session/login/${form}/`,
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
      }
    }),
    loginOptions: build.query<{
      id: number;
      otpBypassTokenExists?: boolean;
    }, null>({
      query: () => ({
        url: 'session/login/options/',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => result === undefined
        ? []
        : [{ type: 'user', id: result.id }]
    })
  })
});

export default loginApi;
export const {
  useLoginMutation,
  useLoginOptionsQuery
} = loginApi;
