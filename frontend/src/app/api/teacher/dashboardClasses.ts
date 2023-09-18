import api from '../api';

const dashboardClassesApi = api.injectEndpoints({
  endpoints: (build) => ({
    acceptStudentRequest: build.mutation<void, {
      id: string
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/student/accept/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    rejectStudentRequest: build.mutation<void, {
      id: string
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/student/reject/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default dashboardClassesApi;
export const {
  useAcceptStudentRequestMutation,
  useRejectStudentRequestMutation
} = dashboardClassesApi;
