import api from '../../api';

const teacherDashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherData: build.query({
      query: () => ({
        url: 'teach/dashboard/'
      }),
      transformResponse: (response: any) => {
        const rtn = { school: null, coworkers: response.coworkers, is_admin: response.is_admin };
        console.log('resp', response);
        rtn.school = JSON.parse(response.school)[0].fields;
        return rtn;
      }
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
    }),
    updateSchool: build.mutation<void, {
      name: string;
      postcode: string;
      country: string;
    }>({
      query: (body) => ({
        url: 'teach/update_school/',
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
  useGetTeacherDataQuery,
  useInviteTeacherMutation,
  useUpdateSchoolMutation
} = teacherDashboardApi;
