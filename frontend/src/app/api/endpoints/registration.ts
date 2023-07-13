import api from '../api';

const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    resetTeacherPassword: build.mutation<null, {
      email: string;
    }>({
      query: (body) => ({
        url: 'user/password/reset/teacher/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default registrationApi;
export const {
  useResetTeacherPasswordMutation
} = registrationApi;
