import api from '../api';

const organisationApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrganisation: build.mutation<void, {
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
    leaveOrganisation: build.mutation<{
      hasClasses: boolean,
      classes?: any,
      teachers?: any
    }, void>({
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
