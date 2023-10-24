import api from '../api';

export interface studentPerAccessCode {
  id: number;
  classField: number;
  newUser: {
    id: number;
    firstName: string;
    lastName: string;
  };
  pendingClassRequest: number;
  blockedTime: string;
}

const teachApi = api.injectEndpoints({
  endpoints: (build) => ({
    teacherHas2fa: build.query<{ has2fa: boolean }, null>({
      query: () => ({
        url: 'teacher/handle-2fa/',
        method: 'GET'
      })
    }),
    disable2fa: build.mutation<null, null>({
      query: () => ({
        url: 'teacher/handle-2fa/',
        method: 'DELETE'
      })
    }),
    getClass: build.query<
      {
        class: {
          name: string;
          classmateProgress: boolean;
        };
        externalRequestsMessage: string;
      },
      {
        accessCode: string;
      }
    >({
      query: ({ accessCode }) => ({
        url: `teach/class/edit/${accessCode}`,
        method: 'GET'
      }),
      providesTags: (result, error, { accessCode }) => [
        { type: 'class', id: accessCode }
      ]
    }),
    getStudentsByAccessCode: build.query<{
      studentsPerAccessCode: studentPerAccessCode[];
    }, {
      accessCode: string
    }>({
      query: ({ accessCode }) => ({
        url: `class/students/${accessCode}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { accessCode }) => [
        { type: 'student', id: accessCode }
      ]
    }),
    getStudent: build.query<{
      student: studentPerAccessCode;
    }, {
      studentId: string
    }>({
      query: ({ studentId }) => ({
        url: `class/student/${studentId}/`,
        method: 'GET'
      })
    }),
    updateClass: build.mutation<null, {
      accessCode: string;
      classEditSubmit?: boolean;
      levelControlSubmit?: boolean;
      classMoveSubmit?: boolean;
      name: string;
      classmateProgress: boolean;
      externalRequests: string;
    }>({
      query: ({ accessCode, ...body }) => ({
        url: `teach/class/edit/${accessCode}`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, { accessCode }) => [
        { type: 'class', id: accessCode }
      ]
    }),
    editStudentPassword: build.mutation<{
      accessCode: string;
    }, {
      studentId: string;
      password: string;
      confirmPassword: string;
    }>({
      query: ({ studentId, password, confirmPassword }) => ({
        url: `teach/student/edit/${studentId}`,
        method: 'POST',
        body: {
          password,
          confirmPassword
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    editStudentName: build.mutation<null, {
      studentId: string;
      name: string;
    }>({
      query: ({ studentId, name }) => ({
        url: `teach/student/edit/${studentId}`,
        method: 'POST',
        body: {
          name
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    deleteClass: build.mutation<null, {
      accessCode: string
    }>({
      query: ({ accessCode }) => ({
        url: `teach/class/delete/${accessCode}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    }),
    moveClass: build.mutation<null, {
      accessCode: string;
      teacherId: string;
    }>({
      query: (body) => ({
        url: 'teach/move_class/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    }),
    deleteStudent: build.mutation<
      any,
      {
        accessCode: string,
        transferStudents: string
      }
    >({
      query: ({ accessCode, ...body }) => ({
        url: `teach/class/${accessCode}/students/delete/`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, { accessCode }) => [
        { type: 'student', id: accessCode }
      ]
    }),
    getReminderCards: build.mutation<null, {
      accessCode: string;
      data: any;
    }>({
      query: ({ accessCode, data }) => ({
        url: `teach/onboarding-class/${accessCode}/print-reminder-cards/`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/pdf'
        },
        responseType: 'blob'
      })
    })
  })
});

export default teachApi;
export const {
  useGetClassQuery,
  useUpdateClassMutation,
  useEditStudentNameMutation,
  useEditStudentPasswordMutation,
  useGetReminderCardsMutation,
  useGetStudentsByAccessCodeQuery,
  useGetStudentQuery,
  useTeacherHas2faQuery,
  useDeleteClassMutation,
  useMoveClassMutation,
  useDeleteStudentMutation,
  useDisable2faMutation
} = teachApi;
