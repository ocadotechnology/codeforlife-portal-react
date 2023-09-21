import api from '../api';

const teachApi = api.injectEndpoints({
  endpoints: (build) => ({
    teacherHas2fa: build.query<{ has2fa: boolean }, null>({
      query: () => ({
        url: 'teacher/handle-2fa/',
        method: 'GET'
      })
    }),
    disable2fa: build.mutation<null, null>({
      query: () => ({
        url: 'teacher/handle-2fa/',
        method: 'DELETE'
      })
    }),
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
  useTeacherHas2faQuery,
  useDisable2faMutation
} = teachApi;
