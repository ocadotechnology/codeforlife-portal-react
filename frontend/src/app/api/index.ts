import api from './api';
import {
  useSignUpMutation,
  useConsentFormMutation
} from './endpoints/dotmailer';
import {
  useRegisterUserMutation
} from './endpoints/home';
import {
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation
} from './endpoints/registration';

export default api;
export {
  // dotmailer
  useSignUpMutation,
  useConsentFormMutation,
  // home
  useRegisterUserMutation,
  // registration
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation
};
