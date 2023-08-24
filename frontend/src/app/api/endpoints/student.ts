import api from '../api';

interface StudentScoreProps {
  numCompleted: number;
  numTopScores: number;
  totalScore: number;
  totalAvailableScore: number;
}

const studentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStudentScore: build.query<StudentScoreProps, null>({
      query: () => ({
        url: 'student/rapid_router_scores/',
        method: 'GET'
      })
    })
  })
});

export default studentApi;
export const { useGetStudentScoreQuery } = studentApi;
