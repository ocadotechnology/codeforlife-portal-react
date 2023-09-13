import api from './api';

interface StudentScoreProps {
  numCompleted: number;
  numTopScores: number;
  totalScore: number;
  totalAvailableScore: number;
}

interface StudentKuronoGameDataProps {
  worksheetId: number;
  worksheetImage: string;
}

interface NotificationResponseProps {
  notification: string[];
}

const studentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStudentScore: build.query<StudentScoreProps, null>({
      query: () => ({
        url: 'student/rapid_router_scores/',
        method: 'GET'
      })
    }),
    getStudentKuronoGameData: build.query<StudentKuronoGameDataProps, null>({
      query: () => ({
        url: 'student/kurono_game_data/',
        method: 'GET'
      })
    }),
    updateStudentDetails: build.mutation<
      NotificationResponseProps,
      {
        name: string;
        email: string;
        newPassword: string;
        repeatPassword: string;
        currentPassword: string;
      }
    >({
      query: (body) => ({
        url: 'independent/edit-details/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    joinSchoolRequest: build.mutation<null, { accessCode: string }>({
      query: (body) => ({
        url: 'student-join-organisation/',
        method: 'POST',
        body: { ...body, classJoinRequest: '' },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result) => [{ type: 'studentRequest' }]
    }),
    revokeSchoolRequest: build.mutation<null, { accessCode: string }>({
      query: (body) => ({
        url: 'student-join-organisation/',
        method: 'POST',
        body: { ...body, revokeJoinRequest: '' },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }),
      invalidatesTags: (result) => [{ type: 'studentRequest' }]
    }),
    isRequestingToJoinSchool: build.query<
      { accessCode: string; isPending: boolean },
      null
    >({
      query: () => ({
        url: 'is-pending-class-request/',
        method: 'GET'
      }),
      providesTags: (result) => [{ type: 'studentRequest' }]
    }),
    updateSchoolStudentDetails: build.mutation<
      NotificationResponseProps,
      {
        newPassword: string;
        repeatPassword: string;
        currentPassword: string;
      }
    >({
      query: (body) => ({
        url: 'school-student/edit-details/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default studentApi;
export const {
  useGetStudentScoreQuery,
  useGetStudentKuronoGameDataQuery,
  useUpdateStudentDetailsMutation,
  useUpdateSchoolStudentDetailsMutation,
  useJoinSchoolRequestMutation,
  useRevokeSchoolRequestMutation,
  useIsRequestingToJoinSchoolQuery
} = studentApi;
