import api from '../api';

const teacherAccountApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateTeacherAccountDetails: build.mutation<
      null,
      {
        firstName: string;
        lastName: string;
        email: string;
        newPassword: string;
        repeatPassword: string;
        currentPassword: string;
      }
    >({
      query: (body) => ({
        url: 'teacher/update/account/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default teacherAccountApi;
export const { useUpdateTeacherAccountDetailsMutation } = teacherAccountApi;
