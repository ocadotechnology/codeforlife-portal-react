import api from './api';

// TODO: move this to sso service.
const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<null, {
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
    }>({
      query: (body) => {
        let form: string;
        if ('email' in body) form = 'email';
        else if ('username' in body) form = 'username';
        else if ('userId' in body) form = 'user-id';
        else if ('otp' in body) form = 'otp';
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
    })
  })
});

export default loginApi;
export const {
  useLoginMutation
} = loginApi;
