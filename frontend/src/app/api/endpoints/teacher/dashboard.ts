import api from '../../api';

const teacherDashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherDashboard: build.query({
      query: () => ({
        url: 'teach/dashboard/'
      })
    })
  })
});

export default teacherDashboardApi;
export const {
  useLazyGetTeacherDashboardQuery
} = teacherDashboardApi;
