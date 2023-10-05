import api from '../api';

export interface CoworkersProps {
  id: string,
  isTeacherAdmin: boolean,
  teacherEmail: string,
  teacherFirstName: string,
  teacherLastName: string,
};

export interface SentInvitesProps {
  id: string,
  invitedTeacherIsAdmin: boolean,
  invitedTeacherEmail: string,
  invitedTeacherFirstName: string,
  invitedTeacherLastName: string,
  token: string,
  isExpired: boolean,
  expiry: string,
};

export interface SchoolProps {
  name: string,
  postcode: string,
  country: string,
};

interface TeacherProps {
  id: string,
  isAdmin: boolean,
  teacherEmail: string,
  teacherFirstName: string,
  teacherLastName: string,
};

interface ClassesProps {
  name: string,
  accessCode: string,
  classTeacherId: number,
  classTeacherFirstName: string,
  classTeacherLastName: string,
};

interface ExternalRequestProps {
  studentId: number,
  studentFirstName: string,
  studentEmail: string
  requestClass: string,
  requestTeacherEmail: string,
  requestTeacherFirstName: string,
  requestTeacherId: number,
  requestTeacherLastName: string,
  isRequestTeacher: boolean,
};

export interface TeacherDashboardProps {
  coworkers: CoworkersProps[],
  teacher: TeacherProps,
  sentInvites: SentInvitesProps[],
  backupToken: number,
  requests: ExternalRequestProps[],
  classes: ClassesProps[],
  school: SchoolProps
}

export type MoveClassesFormProps = Record<string, string>;

export interface OrgansationKickProps extends MoveClassesFormProps {
  id: string,
};

export interface MoveClassDataProps {
  source: string,
  teacher: TeacherProps,
  classes: ClassesProps[],
  coworkers: CoworkersProps[]
};

interface InviteTeacherReturnProps {
  hasError: boolean,
  error: string
};

const teacherDashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherData: build.query<TeacherDashboardProps, void
    >({
      query: () => ({
        url: 'teach/dashboard/',
        method: 'GET'
      }),
      transformResponse: (response: TeacherDashboardProps) => {
        response.sentInvites.forEach((s: SentInvitesProps) => {
          s.isExpired = Date.parse(s.expiry) < Date.now();
        });
        return response;
      },
      providesTags: ['teacher']
    }),
    inviteTeacher: build.mutation<InviteTeacherReturnProps, {
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
      }),
      invalidatesTags: ['teacher']
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
      }),
      invalidatesTags: ['teacher']
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
      }),
      invalidatesTags: ['teacher']
    }),
    organisationKick: build.mutation<MoveClassDataProps, OrgansationKickProps
    >({
      query: (body) => ({
        url: `teach/dashboard/kick/${body.id}/`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: ['teacher']
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
      }),
      invalidatesTags: ['teacher']
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
      }),
      invalidatesTags: ['teacher']
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
