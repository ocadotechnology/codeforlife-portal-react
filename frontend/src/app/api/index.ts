import api from './api';
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
import { useGetClassQuery, useUpdateClassMutation } from './teacher/teach';

import {
  useGetStudentScoreQuery,
  useGetStudentKuronoGameDataQuery,
  useUpdateSchoolStudentDetailsMutation,
  useUpdateStudentDetailsMutation,
  useJoinSchoolRequestMutation,
  useRevokeSchoolRequestMutation
} from './student';

export default api;
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
  useUpdateSchoolStudentDetailsMutation,
  useJoinSchoolRequestMutation,
  useRevokeSchoolRequestMutation,
  // teacher/teach
  useGetClassQuery,
  useUpdateClassMutation
};
