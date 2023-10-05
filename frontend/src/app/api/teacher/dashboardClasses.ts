import api from '../api';

export interface CreateClassFormProps {
  class: string,
  teacherName: string,
  seeClassmates: boolean,
  teacherId: string,
};

export interface CreatedClassProps {
  name: string,
  accessCode: string,
};

export interface StudentRequestProps {
  student: {
    studentUsername: string,
    className: string,
    classAccessCode: string
  },
  students: string[],
}

const dashboardClassesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStudentRequestData: build.query<StudentRequestProps, {
      studentId: number
    }>({
      query: ({ studentId }) => ({
        url: `teach/dashboard/student/request/${studentId}/`,
        method: 'GET'
      })
    }),
    acceptStudentRequest: build.mutation<void, {
      studentId: number
      name: string
    }>({
      query: (body) => ({
        url: `teach/dashboard/student/accept/${body.studentId}/`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    }),
    rejectStudentRequest: build.mutation<void, {
      studentId: number
    }>({
      query: ({ studentId }) => ({
        url: `teach/dashboard/student/reject/${studentId}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    }),
    createNewClass: build.mutation<CreatedClassProps, CreateClassFormProps
    >({
      query: (body) => ({
        url: 'teach/create_new_class/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    })
  })
});

export default dashboardClassesApi;
export const {
  useGetStudentRequestDataQuery,
  useAcceptStudentRequestMutation,
  useRejectStudentRequestMutation,
  useCreateNewClassMutation
} = dashboardClassesApi;
