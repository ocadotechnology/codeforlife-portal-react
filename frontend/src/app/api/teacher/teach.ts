import api from '../api';

const teachApi = api.injectEndpoints({
  endpoints: (build) => ({
    getClass: build.query<
      {
        // blockly_episodes
        // python_episodes
        // locked_levels
        class: {
          name: string;
          classmateProgress: boolean;
        };
        externalRequestsMessage: string;
      },
      {
        accessCode: string;
      }
    >({
      query: ({ accessCode }) => ({
        url: `teach/class/edit/${accessCode}`,
        method: 'GET'
      }),
      providesTags: (result, error, { accessCode }) => [
        { type: 'class', id: accessCode }
      ]
    }),
    getStudentsByAccessCode: build.query<
      {
        studentsPerAccessCode: Array<{
          id: number;
          classField: number;
          newUser: {
            id: number;
            firstName: string;
            lastName: string;
          };
          pendingClassRequest: number;
          blockedTime: string;
        }>;
      },
      { accessCode: string } // Specify the input type
    >({
      query: ({ accessCode }) => ({
        url: `class/students/${accessCode}/`,
        method: 'GET'
      }),
      providesTags: (result, error, { accessCode }) => [
        { type: 'student', id: accessCode }
      ]
    }),
    updateClass: build.mutation<
      null,
      {
        accessCode: string;
        classEditSubmit?: boolean;
        levelControlSubmit?: boolean;
        classMoveSubmit?: boolean;
        name: string;
        classmateProgress: boolean;
        externalRequests: string;
      }
    >({
      query: ({ accessCode, ...body }) => ({
        url: `teach/class/edit/${accessCode}`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result, error, { accessCode }) => [
        { type: 'class', id: accessCode }
      ]
    })
  })
});

export default teachApi;
export const {
  useGetClassQuery,
  useUpdateClassMutation,
  useGetStudentsByAccessCodeQuery
} = teachApi;
