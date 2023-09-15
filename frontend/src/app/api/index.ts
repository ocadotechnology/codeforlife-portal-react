import api, {
  useLogoutMutation
} from './api';
import {
  useSubscribeToNewsletterMutation,
  useConsentFormMutation
} from './dotmailer';
import {
  useRegisterUserMutation,
  useDownloadStudentPackMutation
} from './home';
import {
  useLoginMutation
} from './login';
import {
  useCreateOrganisationMutation,
  useLeaveOrganisationMutation
} from './organisation';
import {
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation
} from './registration';
import {
  useGetClassQuery,
  useUpdateClassMutation
} from './teacher/teach';

export default api;
export {
  // api
  useLogoutMutation,
  // dotmailer
  useSubscribeToNewsletterMutation,
  useConsentFormMutation,
  // home
  useRegisterUserMutation,
  useDownloadStudentPackMutation,
  // login
  useLoginMutation,
  // organisation
  useCreateOrganisationMutation,
  useLeaveOrganisationMutation,
  // registration
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  // teacher/teach
  useGetClassQuery,
  useUpdateClassMutation
};
