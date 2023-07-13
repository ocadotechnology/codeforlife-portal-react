import api from './api';
import {
  useSignUpMutation,
  useConsentFormMutation
} from './endpoints/dotmailer';
import {
  useResetIndependentStudentPasswordMutation,
  useResetTeacherPasswordMutation,
  useDeleteAccountMutation
} from './endpoints/registration';

export default api;
export {
  // dotmailer
  useSignUpMutation,
  useConsentFormMutation,
  // registration
  useResetIndependentStudentPasswordMutation,
  useResetTeacherPasswordMutation,
  useDeleteAccountMutation
};
