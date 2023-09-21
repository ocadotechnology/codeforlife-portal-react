import api from './api';

// TODO: clean this up
export interface classType {
  id: number,
  name: string,
  accessCode: string
};

export interface teacherType {
  id: number,
  newUserIdFirstName: string,
  newUserIdLastName: string
};

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
    leaveOrganisation: build.mutation<{
      source?: string;
      classes?: classType[],
      teachers?: teacherType[]
    }, void | object
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
