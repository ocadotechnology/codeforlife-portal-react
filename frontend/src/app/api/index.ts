import api, { useLogoutMutation } from './api';
import {
  useConsentFormMutation,
  useSubscribeToNewsletterMutation
} from './dotmailer';
import {
  useDownloadStudentPackMutation,
  useRegisterUserMutation
} from './home';
import {
  useLoginMutation
} from './login';
import {
  useCreateOrganisationMutation,
  useLeaveOrganisationMutation
} from './organisation';
import {
  useDeleteAccountMutation,
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyPasswordMutation
} from './registration';
import {
  useGetStudentKuronoGameDataQuery,
  useGetStudentScoreQuery,
  useIsRequestingToJoinSchoolQuery,
  useJoinSchoolRequestMutation,
  useRevokeSchoolRequestMutation,
  useUpdateSchoolStudentDetailsMutation,
  useUpdateStudentDetailsMutation
} from './student';
import {
  useUpdateTeacherAccountDetailsMutation
} from './teacher/account';
import {
  useDeleteInviteMutation,
  useGetTeacherDataQuery,
  useInviteTeacherMutation,
  useInviteToggleAdminMutation,
  useOrganisationKickMutation,
  useResendInviteMutation,
  useToggleAdminMutation,
  useUpdateSchoolMutation
} from './teacher/dashboard';
import {
  useDeleteClassMutation,
  useDisable2faMutation,
  useEditStudentNameMutation,
  useEditStudentPasswordMutation,
  useGetClassQuery,
  useGetStudentsByAccessCodeQuery,
  useMoveClassMutation,
  useTeacherHas2faQuery,
  useUpdateClassMutation
} from './teacher/teach';
import {
  useReadUserQuery,
  useReadUsersQuery,
  useUpdateUserMutation
} from './user';

export default api;
export {
  useConsentFormMutation,
  useCreateOrganisationMutation,
  useDeleteAccountMutation,
  useDeleteClassMutation,
  useDeleteInviteMutation,
  useDisable2faMutation,
  useDownloadStudentPackMutation,
  useEditStudentNameMutation,
  useEditStudentPasswordMutation,
  useGetClassQuery,
  useGetStudentKuronoGameDataQuery,
  useGetStudentScoreQuery,
  useGetStudentsByAccessCodeQuery,
  useGetTeacherDataQuery,
  useInviteTeacherMutation,
  useInviteToggleAdminMutation,
  useIsRequestingToJoinSchoolQuery,
  useJoinSchoolRequestMutation,
  useLeaveOrganisationMutation,
  useLoginMutation,
  useLogoutMutation,
  useMoveClassMutation,
  useOrganisationKickMutation,
  useReadUserQuery,
  useReadUsersQuery,
  useRegisterUserMutation,
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResendInviteMutation,
  useResetPasswordMutation,
  useRevokeSchoolRequestMutation,
  useSubscribeToNewsletterMutation,
  useTeacherHas2faQuery,
  useToggleAdminMutation,
  useUpdateClassMutation,
  useUpdateSchoolMutation,
  useUpdateSchoolStudentDetailsMutation,
  useUpdateStudentDetailsMutation,
  useUpdateTeacherAccountDetailsMutation,
  useUpdateUserMutation,
  useVerifyPasswordMutation
};
