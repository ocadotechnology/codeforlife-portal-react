import api from '../api';

interface StudentInfo {
  id: number;
  name: string;
  password: string;
  loginUrl: string;
}

export interface ResetStudentPasswordResponseProps {
  class: string;
  studentsInfo: StudentInfo[];
  onboardingDone: boolean;
  queryData: StudentInfo[];
  classUrl: string;
}

const teachApi = api.injectEndpoints({
  endpoints: (build) => ({
    editStudentPassword: build.mutation<
      ResetStudentPasswordResponseProps,
      {
        studentId: string;
        password: string;
        confirmPassword: string;
      }
    >({
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
    editStudentName: build.mutation<
      null,
      {
        studentId: string;
        name: string;
      }
    >({
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
    getClass: build.query<
      {
        // blockly_episodes
        // python_episodes
        // locked_levels
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
    updateClass: build.mutation<
      null,
      {
        accessCode: string;
        classEditSubmit?: boolean;
        levelControlSubmit?: boolean;
        classMoveSubmit?: boolean;
        name: string;
        classmateProgress: boolean;
        externalRequests: string;
      }
    >({
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
    getReminderCards: build.mutation<null, { accessCode: string; data: any }>({
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
  useGetReminderCardsMutation
} = teachApi;
