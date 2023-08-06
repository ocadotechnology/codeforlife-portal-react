import api from '../api';

const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginTeacher: build.mutation<null, {
      // TODO: implement 2fs teacher login
      // 'auth-username': string;
      // 'auth-password': string;
      // currentStep: 'auth' | 'token';
      username: string;
      password: string;
    }>({
      query: (body) => ({
        url: 'login/teacher/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    loginDependentStudent: build.mutation<null, {
      accessCode: string;
      username: string;
      password: string;
    }>({
      query: ({ accessCode, ...body }) => ({
        url: `login/student/${accessCode}/`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    loginDependentStudentAutomatically: build.mutation<null, {
      userId: string;
      loginId: string;
    }>({
      query: ({ userId, loginId }) => ({
        url: `u/${userId}/${loginId}/`,
        method: 'POST'
      })
    }),
    loginIndependentStudent: build.mutation<null, {
      username: string;
      password: string;
    }>({
      query: (body) => ({
        url: 'login/independent/',
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
  useLoginDependentStudentAutomaticallyMutation,
  useLoginIndependentStudentMutation
} = loginApi;
