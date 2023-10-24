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
  Class,
  useDestroyClassMutation,
  useLazyCreateClassQuery,
  useListClassesQuery,
  useRetrieveClassQuery,
  useUpdateClassMutation
} from './klass';
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
  School,
  useDestroySchoolMutation,
  useLazyCreateSchoolQuery,
  useListSchoolsQuery,
  useRetrieveSchoolQuery,
  useUpdateSchoolMutation
} from './school';
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
  useOldUpdateSchoolMutation,
  useOrganisationKickMutation,
  useResendInviteMutation,
  useToggleAdminMutation
} from './teacher/dashboard';
import {
  useDeleteClassMutation,
  useDisable2faMutation,
  useEditStudentNameMutation,
  useEditStudentPasswordMutation,
  useGetClassQuery,
  useGetStudentsByAccessCodeQuery,
  useMoveClassMutation,
  useTeacherHas2faQuery
} from './teacher/teach';
import {
  User,
  useBulkDestroyUsersMutation,
  useBulkUpdateUsersMutation,
  useDestroyUserMutation,
  useLazyBulkCreateUsersQuery,
  useLazyCreateUserQuery,
  useListUsersQuery,
  useRetrieveUserQuery,
  useUpdateUserMutation
} from './user';

export default api;
export {
  useBulkDestroyUsersMutation,
  useBulkUpdateUsersMutation,
  useConsentFormMutation,
  useCreateOrganisationMutation,
  useDeleteAccountMutation,
  useDeleteClassMutation,
  useDeleteInviteMutation,
  useDestroyClassMutation,
  useDestroySchoolMutation,
  useDestroyUserMutation,
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
  useLazyBulkCreateUsersQuery,
  useLazyCreateClassQuery,
  useLazyCreateSchoolQuery,
  useLazyCreateUserQuery,
  useLeaveOrganisationMutation,
  useListClassesQuery,
  useListSchoolsQuery,
  useListUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useMoveClassMutation,
  useOldUpdateSchoolMutation,
  useOrganisationKickMutation,
  useRegisterUserMutation,
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResendInviteMutation,
  useResetPasswordMutation,
  useRetrieveClassQuery,
  useRetrieveSchoolQuery,
  useRetrieveUserQuery,
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
  useVerifyPasswordMutation,
  type Class,
  type School,
  type User
};
