import api from '../api';

const organisationApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrganisation: build.mutation<null | {
      success: boolean
    }, {
      name: string;
      postcode: string;
      country: string;
    }>({
      query: (body) => ({
        url: 'teacher/onboarding-organisation/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    leaveOrganisation: build.mutation<void, void>({
      query: () => ({
        url: 'teacher/leave-organisation/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default organisationApi;
export const {
  useCreateOrganisationMutation,
  useLeaveOrganisationMutation
} = organisationApi;
