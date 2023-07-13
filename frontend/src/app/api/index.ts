import api from './api';
import {
  useSignUpMutation,
  useConsentFormMutation
} from './endpoints/dotmailer';
import {
  useResetTeacherPasswordMutation,
  useDeleteAccountMutation
} from './endpoints/registration';

export default api;
export {
  // dotmailer
  useSignUpMutation,
  useConsentFormMutation,
  // registration
  useResetTeacherPasswordMutation,
  useDeleteAccountMutation
};
