import api from '../api';

const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<null, {
      teacherFirstName: string;
      teacherLastName: string;
      teacherEmail: string;
    } | {
      dateOfBirth: Date;
      name: string;
      email: string;
      consentTicked?: boolean;
      newsletterTicked?: boolean;
      password: string;
      confirmPassword: string;
    }>({
      query: (body) => ({
        url: 'register/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default homeApi;
export const {
  useRegisterUserMutation
} = homeApi;
