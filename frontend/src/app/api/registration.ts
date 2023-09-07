import api from 'codeforlife/lib/esm/api';

const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    requestIndependentStudentPasswordReset: build.mutation<
      null,
      {
        email: string;
      }
    >({
      query: (body) => ({
        url: 'user/password/reset/student/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    requestTeacherPasswordReset: build.mutation<
      null,
      {
        email: string;
      }
    >({
      query: (body) => ({
        url: 'user/password/reset/teacher/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    resetPassword: build.mutation<
      null,
      {
        userId: string;
        token: string;
        body: {
          new_password1: string;
          new_password2: string;
        };
      }
    >({
      query: ({ userId, token, body }) => ({
        url: `user/password/reset/${userId}-${token}/`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    verifyPassword: build.mutation<
      { isPasswordCorrect: string },
      {
        password: string;
      }
    >({
      query: (body) => ({
        url: 'verify-password/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    deleteAccount: build.mutation<
      null | {
        password?: string;
      },
      {
        password: string;
        unsubscribeNewsletter: boolean;
      }
    >({
      query: (body) => ({
        url: 'delete/account/',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
  })
});

export default registrationApi;
export const {
  useRequestIndependentStudentPasswordResetMutation,
  useRequestTeacherPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyPasswordMutation,
  useDeleteAccountMutation
} = registrationApi;
