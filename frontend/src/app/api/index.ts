import {
  useSubscribeToNewsletterMutation,
  useConsentFormMutation
} from './dotmailer';
import {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useDownloadStudentPackMutation
} from './home';
import {
  useLoginTeacherMutation,
  useLoginDependentStudentMutation,
  useLoginDependentStudentDirectlyMutation,
  useLoginIndependentStudentMutation
} from './login';
import {
  useCreateOrganisationMutation,
  useLeaveOrganisationMutation
} from './organisation';
import {
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyPasswordMutation,
  useDeleteAccountMutation
} from './registration';

import {
  useGetStudentScoreQuery,
  useGetStudentKuronoGameDataQuery,
  useUpdateSchoolStudentDetailsMutation,
  useUpdateStudentDetailsMutation
} from './student';

export {
  // dotmailer
  useSubscribeToNewsletterMutation,
  useConsentFormMutation,
  // home
  useRegisterUserMutation,
  useLogoutUserMutation,
  useDownloadStudentPackMutation,
  // login
  useLoginTeacherMutation,
  useLoginDependentStudentMutation,
  useLoginDependentStudentDirectlyMutation,
  useLoginIndependentStudentMutation,
  // organisation
  useCreateOrganisationMutation,
  useLeaveOrganisationMutation,
  // registration
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyPasswordMutation,
  useDeleteAccountMutation,
  // student
  useGetStudentScoreQuery,
  useGetStudentKuronoGameDataQuery,
  useUpdateStudentDetailsMutation,
  useUpdateSchoolStudentDetailsMutation
};
