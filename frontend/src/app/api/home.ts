import api from './api';

const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<null, {
      teacherFirstName: string;
      teacherLastName: string;
      teacherEmail: string;
      teacherPassword: string;
      teacherConfirmPassword: string;
      consentTicked: boolean;
      newsletterTicked: boolean;
    } | {
      dateOfBirth: Date;
      name: string;
      email: string;
      consentTicked: boolean;
      newsletterTicked: boolean;
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
    }),
    downloadStudentPack: build.mutation<{
      link: string;
    }, {
      id: 3 | 4
    }>({
      query: ({ id }) => ({
        url: `codingClub/${id}/`,
        method: 'GET'
      })
    })
  })
});

export default homeApi;
export const {
  useRegisterUserMutation,
  useDownloadStudentPackMutation
} = homeApi;
