import api from '../api';

const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginTeacher: build.mutation<null, {
      username: string;
      password: string;
    }>({
      query: (body) => ({
        url: 'login/teacher',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    loginDependentStudent: build.mutation<null, {
      accessCode: string;
      body: {
        username: string;
        password: string;
      }
    }>({
      query: ({ accessCode, body }) => ({
        url: `login/student/${accessCode}`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    loginIndependentStudent: build.mutation<null, {
      username: string;
      password: string;
    }>({
      query: (body) => ({
        url: 'login/independent',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default loginApi;
export const {
  useLoginTeacherMutation,
  useLoginDependentStudentMutation,
  useLoginIndependentStudentMutation
} = loginApi;
