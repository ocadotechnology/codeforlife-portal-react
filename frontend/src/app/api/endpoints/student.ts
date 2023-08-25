import { Build } from '@mui/icons-material';
import api from '../api';

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
    })
  })
});

export default studentApi;
export const { useGetStudentScoreQuery, useGetStudentKuronoGameDataQuery } =
  studentApi;
