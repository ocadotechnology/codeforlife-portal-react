import api from '../api';

const dotmailerApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<null | {
      success: boolean
    }, {
      email: string;
    }>({
      query: (body) => ({
        url: 'news_signup/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    consentForm: build.mutation<null | {
      success: boolean
    }, {
      email: string;
    }>({
      query: (body) => ({
        url: 'consent_form/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default dotmailerApi;
export const {
  useSignUpMutation,
  useConsentFormMutation
} = dotmailerApi;
