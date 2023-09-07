import api from 'codeforlife/lib/esm/api';

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
  useUpdateSchoolStudentDetailsMutation
} = studentApi;
