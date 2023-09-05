import api from '../api';

const accountApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteAccount: build.mutation<
      void,
      {
        password: string;
        unsubstribeNewsletter: boolean;
      }
    >({
      query: (body) => ({
        url: 'delete-account/',
        method: 'DELETE',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default accountApi;
export const { useDeleteAccountMutation } = accountApi;
