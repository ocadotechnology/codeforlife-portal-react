import api from '../api';

export interface CreateClassFormType {
  class: string,
  teacherName: string,
  seeClassmates: boolean,
  teacherId?: string,
};

export interface CreatedClassType {
  name: string,
  accessCode: string,
};

const dashboardClassesApi = api.injectEndpoints({
  endpoints: (build) => ({
    acceptStudentRequest: build.mutation<void, {
      id: number
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/student/accept/${id}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    }),
    rejectStudentRequest: build.mutation<void, {
      id: number
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/student/reject/${id}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
    }),
    createNewClass: build.mutation<CreatedClassType, CreateClassFormType
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
  useAcceptStudentRequestMutation,
  useRejectStudentRequestMutation,
  useCreateNewClassMutation
} = dashboardClassesApi;
