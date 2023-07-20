import qs from 'qs';

import api from '../api';

const dotmailerApi = api.injectEndpoints({
  endpoints: (build) => ({
    // TODO: set body and response types
    signUp: build.mutation({
      query: (body) => ({
        url: 'news_signup/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    // TODO: set body and response types
    consentForm: build.mutation({
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
