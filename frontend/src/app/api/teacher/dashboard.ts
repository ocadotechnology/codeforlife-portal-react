import api from 'codeforlife/lib/esm/api';
import { classType, teacherType } from '../organisation';

interface coworkersType {
  id: number,
  isTeacherAdmin: boolean,
  teacherEmail: string,
  teacherFirstName: string,
  teacherLastName: string,
};

interface sentInvitesType {
  id: number,
  isTeacherAdmin: boolean,
  invitedTeacherEmail: string,
  invitedTeacherFirstName: string,
  invitedTeacherLastName: string,
  token: string,
  isExpired: boolean,
  expiry: string,
};

const teacherDashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherData: build.query<{
      school: string;
      coworkers: coworkersType[];
      isAdmin: boolean;
      sentInvites: sentInvitesType[];
    }, void
    >({
      query: () => ({
        url: 'teach/dashboard/',
        method: 'GET'
      }),
      transformResponse: (response: any) => {
        const rtn = {
          school: '',
          coworkers: response.coworkers,
          isAdmin: response.isAdmin,
          sentInvites: response.sentInvites
        };
        rtn.sentInvites.forEach((s: sentInvitesType) => {
          s.isExpired = Date.parse(s.expiry) < Date.now();
        });
        rtn.school = JSON.parse(response.school)[0].fields;
        return rtn;
      }
    }),
    inviteTeacher: build.mutation<any, {
      teacherFirstName: string;
      teacherLastName: string;
      teacherEmail: string;
      makeAdminTicked: boolean;
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
    toggleAdmin: build.mutation<{
      isAdminNow: boolean
    }, {
      id: string
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/toggle_admin/${id}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    organisationKick: build.mutation<{
      source?: string,
      classes?: classType,
      teachers?: teacherType,
    }, {
      id: string
      info?: any
    }>({
      query: (body) => ({
        url: `teach/dashboard/kick/${body.id}/`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    inviteToggleAdmin: build.mutation<{
      isAdminNow: boolean
    }, {
      id: string
    }>({
      query: ({ id }) => ({
        url: `teach/dashboard/invite_toggle_admin/${id}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    resendInvite: build.mutation<void, {
      token: string
    }>({
      query: ({ token }) => ({
        url: `teach/dashboard/resend_invite/${token}/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    deleteInvite: build.mutation<void, {
      token: string
    }>({
      query: ({ token }) => ({
        url: `teach/dashboard/delete_invite/${token}/`,
        method: 'POST',
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
  useUpdateSchoolMutation,
  useToggleAdminMutation,
  useOrganisationKickMutation,
  useInviteToggleAdminMutation,
  useResendInviteMutation,
  useDeleteInviteMutation
} = teacherDashboardApi;
