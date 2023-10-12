import api from './api';
import { MoveClassDataProps } from './teacher/dashboard';

const organisationApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrganisation: build.mutation<void, {
      name: string;
      postcode: string;
      country: string;
    }>({
      query: (body) => ({
        url: 'teach/onboarding-organisation/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    leaveOrganisation: build.mutation<MoveClassDataProps, void | object
    >({
      query: (body) => ({
        url: 'teach/leave-organisation/',
        method: 'POST',
        body,
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
