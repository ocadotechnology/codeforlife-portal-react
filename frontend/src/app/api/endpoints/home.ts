import api from '../api';

const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<
      null,
      | {
          teacherFirstName: string;
          teacherLastName: string;
          teacherEmail: string;
          teacherPassword: string;
          teacherConfirmPassword: string;
          consentTicked: boolean;
          newsletterTicked: boolean;
        }
      | {
          dateOfBirth: Date;
          name: string;
          email: string;
          consentTicked: boolean;
          newsletterTicked: boolean;
          password: string;
          confirmPassword: string;
        }
    >({
      query: (body) => ({
        url: 'register/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    // TODO: clear cached data on the frontend.
    // NOTE: a mutation may be needed instead of a query to invalidate the
    // cache. see: https://redux-toolkit.js.org/rtk-query/usage/queries#:~:text=For%20anything%20that%20alters%20data%20on%20the%20server%20or%20will%20possibly%20invalidate%20the%20cache%2C%20you%20should%20use%20a%20Mutation.
    logoutUser: build.mutation<null, null>({
      query: () => ({
        url: 'logout/',
        method: 'GET'
      })
    })
  })
});

export default homeApi;
export const { useRegisterUserMutation, useLogoutUserMutation } = homeApi;
