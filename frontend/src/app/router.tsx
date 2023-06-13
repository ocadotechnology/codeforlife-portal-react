import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { path as _ } from 'codeforlife/lib/esm/helpers';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Teachers from '../pages/teachers/Teachers';
import Students from '../pages/students/Students';
import Register from '../pages/register/Register';
import AboutUs from '../pages/aboutUs/AboutUs';
import CodingClubs from '../pages/codingClubs/CodingClubs';
import GetInvolved from '../pages/getInvolved/GetInvolved';
import HomeLearning from '../pages/homeLearning/HomeLearning';
import PrivacyNotice from '../pages/privacyNotice/PrivacyNotice';
import TermsOfUse from '../pages/termsOfUse/TermsOfUse';
import Newsletter from '../pages/newsletter/Newsletter';
import Error from '../pages/error/Error';
import TeacherDashboard from '../pages/teacherDashboard/TeacherDashboard';
import EmailVerification from '../pages/emailVerification/EmailVerification';
import ResetPassword from '../pages/resetPassword/ResetPassword';
import StudentsDashboard from '../pages/studentsDashboard/StudentsDashboard';
import TeacherOnboarding from '../pages/teacherOnboarding/TeacherOnboarding';

export const paths = _('', {
  login: _('/login', {
    teacher: _('/?userType=teacher', {
      login2fa: _('&loginStep=login2fa'),
      backupToken: _('&loginStep=backupToken')
    }),
    student: _('/?userType=student'),
    independent: _('/?userType=independent')
  }),
  resetPassword: _('/reset-password', {
    teacher: _('/?userType=teacher'),
    independent: _('/?userType=independent')
  }),
  teacher: _('/teacher', {
    onboarding: _('/onboarding'),
    dashboard: _('/dashboard', {
      school: _('/?tab=Your+school'),
      classes: _('/?tab=Your+classes', {
        editClass: _('&accessCode={accessCode}', {
          additional: _('&setView=additional'),
          editStudent: _('&studentID={studentID}'),
          resetStudents: _('&setView=reset'),
          moveStudents: _('&setView=move'),
          releaseStudents: _('setView=release')
        })
      }),
      account: _('/?tab=Your+account', {
        setup2FA: _('&twoFA=setup'),
        backupTokens: _('&twoFA=backupTokens')
      })
    })
  }),
  student: _('/student', {
    dashboard: _('/dashboard', {
      dependent: _('/?userType=dependent'),
      independent: _('/?userType=independent')
    })
  }),
  register: _('/register', {
    emailVerification: _('/email-verification')
  }),
  aboutUs: _('/about-us'),
  codingClubs: _('/coding-clubs'),
  getInvolved: _('/get-involved'),
  homeLearning: _('/home-learning'),
  privacyNotice: _('/privacy-notice', {
    privacyNotice: _('/?tab=Privacy+notice'),
    childFriendly: _('/?tab=Child-friendly')
  }),
  termsOfUse: _('/terms-of-use'),
  newsletter: _('/newsletter'),
  error: _('/error', {
    forbidden: _('/?type=forbidden'),
    pageNotFound: _('/?type=pageNotFound'),
    tooManyRequests: _('/?type=tooManyRequests', {
      teacher: _('&userType=teacher'),
      independent: _('&userType=independent'),
      student: _('&userType=student')
    }),
    internalServerError: _('/?type=internalServerError')
  }),
  rapidRouter: _('/rapid-router'),
  kurono: _('/kurono')
});

const router = createBrowserRouter([
  {
    path: paths._,
    element: <Home />
  },
  {
    path: paths.login._,
    element: <Login />
  },
  {
    path: paths.teacher._,
    element: <Teachers />
  },
  {
    path: paths.teacher.onboarding._,
    element: <TeacherOnboarding />
  },
  {
    path: paths.student._,
    element: <Students />
  },
  {
    path: paths.student.dashboard._,
    element: <StudentsDashboard />
  },
  {
    path: paths.register._,
    element: <Register />
  },
  {
    path: paths.aboutUs._,
    element: <AboutUs />
  },
  {
    path: paths.codingClubs._,
    element: <CodingClubs />
  },
  {
    path: paths.getInvolved._,
    element: <GetInvolved />
  },
  {
    path: paths.homeLearning._,
    element: <HomeLearning />
  },
  {
    path: paths.privacyNotice._,
    element: <PrivacyNotice />
  },
  {
    path: paths.termsOfUse._,
    element: <TermsOfUse />
  },
  {
    path: paths.newsletter._,
    element: <Newsletter />
  },
  {
    path: paths.error._,
    element: <Error />
  },
  {
    path: paths.teacher.dashboard._,
    element: <TeacherDashboard />
  },
  {
    path: paths.register.emailVerification._,
    element: <EmailVerification />
  },
  {
    path: paths.resetPassword._,
    element: <ResetPassword />
  }
]);

export default router;
