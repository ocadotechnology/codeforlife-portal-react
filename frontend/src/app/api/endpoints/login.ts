import { Cookie } from '@mui/icons-material';
import api from '../api';
import Cookies from 'js-cookie';

const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginTeacher: build.mutation<
      null,
      {
        // TODO: implement 2fs teacher login
        // 'auth-username': string;
        // 'auth-password': string;
        // currentStep: 'auth' | 'token';
        username: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: 'login/teacher/',
        method: 'POST',
        body: { ...body, csrfmiddlewaretoken: Cookies.get('csrftoken') },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          XCSRFToken: Cookies.get('csrftoken')
        }
      })
    }),
    loginDependentStudent: build.mutation<
      null,
      {
        accessCode: string;
        username: string;
        password: string;
      }
    >({
      query: ({ accessCode, ...body }) => ({
        url: `login/student/${accessCode}/`,
        body: { ...body, csrfmiddlewaretoken: Cookies.get('csrftoken') },
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          XCSRFToken: Cookies.get('csrftoken')
        }
      })
    }),
    loginDependentStudentDirectly: build.mutation<
      null,
      {
        userId: string;
        loginId: string;
      }
    >({
      query: ({ userId, loginId }) => ({
        url: `u/${userId}/${loginId}/`,
        method: 'POST'
      })
    }),
    loginIndependentStudent: build.mutation<
      null,
      {
        username: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: 'login/independent/',
        method: 'POST',
        body: { ...body, csrfmiddlewaretoken: Cookies.get('csrftoken') },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          XCSRFToken: Cookies.get('csrftoken')
        }
      })
    }),
    getCookies: build.query<{ userType: null | string }, null>({
      query: () => ({
        url: 'set-csrf/',
        method: 'GET'
      })
    })
  })
});

export default loginApi;
export const {
  useLoginTeacherMutation,
  useLoginDependentStudentMutation,
  useLoginDependentStudentDirectlyMutation,
  useLoginIndependentStudentMutation,
  useGetCookiesQuery
} = loginApi;
