import api from '../../api';

const teacherDashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherDashboard: build.query({
      query: () => ({
        url: 'teach/dashboard/'
      })
    }),
    inviteTeacher: build.mutation<void, {
      teacherFirstName: string;
      teacherLastName: string;
      teacherEmail: string;
      isAdmin: boolean;
    }>({
      query: (body) => ({
        url: 'teach/invite/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default teacherDashboardApi;
export const {
  useLazyGetTeacherDashboardQuery,
  useInviteTeacherMutation
} = teacherDashboardApi;
