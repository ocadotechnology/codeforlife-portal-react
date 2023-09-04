import api from '../../api';

const teacherDashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherData: build.query({
      query: () => ({
        url: 'teach/dashboard/'
      }),
      transformResponse: (response: any) => {
        console.log('resp', response);
        const rtn = {
          school: null,
          coworkers: response.coworkers,
          isAdmin: response.is_admin,
          sentInvites: response.sentInvites
        };
        rtn.sentInvites.forEach((s: any) => {
          s.isExpired = Date.parse(s.expiry) < Date.now();
        });
        rtn.school = JSON.parse(response.school)[0].fields;
        console.log('rtn', rtn);
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
    }),
    toggleAdmin: build.mutation<void, {
      id: string
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/toggle_admin/${id}/`,
        method: 'POST'
      })
    }),
    inviteToggleAdmin: build.mutation<void, {
      id: string
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/invite_toggle_admin/${id}/`,
        method: 'POST'
      })
    }),
    resendInvite: build.mutation<void, {
      token: string
    }>({
      query: ({ token }) => ({
        url: `teach/dashboard/resend_invite/${token}/`,
        method: 'POST'
      })
    }),
    deleteInvite: build.mutation<void, {
      token: string
    }>({
      query: ({ token }) => ({
        url: `teach/dashboard/delete_invite/${token}/`,
        method: 'POST'
      })
    })
  })
});

export default teacherDashboardApi;
export const {
  useGetTeacherDataQuery,
  useInviteTeacherMutation,
  useUpdateSchoolMutation,
  useToggleAdminMutation,
  useInviteToggleAdminMutation,
  useResendInviteMutation,
  useDeleteInviteMutation
} = teacherDashboardApi;
