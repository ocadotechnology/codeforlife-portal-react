import api from './api';
import {
  useSignUpMutation,
  useConsentFormMutation
} from './endpoints/dotmailer';
import {
  useResetTeacherPasswordMutation
} from './endpoints/registration';

export default api;
export {
  // dotmailer
  useSignUpMutation,
  useConsentFormMutation,
  // registration
  useResetTeacherPasswordMutation
};
