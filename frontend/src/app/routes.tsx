import React from 'react';
import { Route } from 'react-router-dom';

import { path as _ } from 'codeforlife/lib/esm/helpers';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Teacher from '../pages/teacher/Teacher';
import Student from '../pages/student/Student';
import Register from '../pages/register/Register';
import AboutUs from '../pages/aboutUs/AboutUs';
import CodingClubs from '../pages/codingClubs/CodingClubs';
import GetInvolved from '../pages/getInvolved/GetInvolved';
import Contribute from '../pages/contribute/Contribute';
import HomeLearning from '../pages/homeLearning/HomeLearning';
import PrivacyNotice from '../pages/privacyNotice/PrivacyNotice';
import TermsOfUse from '../pages/termsOfUse/TermsOfUse';
import CommunicationPreferences from '../pages/communicationPreferences/CommunicationPreferences';
import Error from '../pages/error/Error';
import TeacherDashboard from '../pages/teacherDashboard/TeacherDashboard';
import EmailVerification from '../pages/emailVerification/EmailVerification';
import ResetPassword from '../pages/resetPassword/ResetPassword';
import StudentDashboard from '../pages/studentDashboard/StudentDashboard';
import TeacherOnboarding from '../pages/teacherOnboarding/TeacherOnboarding';

export const paths = _('', {
  login: _('/login', {
    teacher: _('/teacher', {
      login2fa: _('/login2fa'),
      backupToken: _('/backupToken')
    }),
    student: _('/student'),
    independent: _('/independent')
  }),
  resetPassword: _('/reset-password', {
    teacher: _('/?userType=teacher'),
    independent: _('/?userType=independent')
  }),
  teacher: _('/teacher', {
    onboarding: _('/onboarding'),
    dashboard: _('/dashboard', {
      school: _('/school'),
      classes: _('/classes', {
        editClass: _('/?accessCode={accessCode}', {
          additional: _('&view=additional'),
          editStudent: _('&view=edit&studentIds={studentIds}'),
          resetStudents: _('&view=reset&studentIds={studentIds}'),
          moveStudents: _('&view=move&studentIds={studentIds}'),
          releaseStudents: _('&view=release&studentIds={studentIds}')
        })
      }),
      account: _('/account', {
        setup2FA: _('/?twoFA=setup'),
        backupTokens: _('/?twoFA=backupTokens')
      })
    })
  }),
  student: _('/student', {
    dashboard: _('/dashboard', {
      dependent: _('/?userType=dependent', {
        account: _('&view=account')
      }),
      independent: _('/?userType=independent', {
        account: _('&view=account'),
        joinSchool: _('&view=join')
      })
    })
  }),
  register: _('/register', {
    emailVerification: _('/email-verification', {
      teacher: _('/teacher'),
      student: _('/student'),
      independent: _('/independent')
    })
  }),
  aboutUs: _('/about-us'),
  codingClubs: _('/coding-clubs'),
  getInvolved: _('/get-involved'),
  contribute: _('/contribute'),
  homeLearning: _('/home-learning'),
  privacyNotice: _('/privacy-notice', {
    privacyNotice: _('/privacy-notice'),
    childFriendly: _('/child-friendly')
  }),
  termsOfUse: _('/terms-of-use', {
    termsOfUse: _('/terms-of-use'),
    childFriendly: _('/child-friendly')
  }),
  newsletter: _('/newsletter'),
  communicationPreferences: _('/communication-preferences'),
  error: _('/error', {
    forbidden: _('/forbidden'),
    pageNotFound: _('/page-not-found'),
    tooManyRequests: _('/too-many-requests', {
      teacher: _('/teacher'),
      independent: _('/independent'),
      student: _('/student')
    }),
    internalServerError: _('/internal-server-error')
  }),
  rapidRouter: _('/rapid-router', {
    scoreboard: _('/scoreboard')
  }),
  kurono: _('/kurono')
});

const routes = <>
  <Route
    path={paths._}
    element={<Home />}
  />
  <Route
    path={paths.aboutUs._}
    element={<AboutUs />}
  />
  <Route
    path={`${paths.privacyNotice._}/:tab`}
    element={<PrivacyNotice />}
  />
  <Route
    path={`${paths.termsOfUse._}/:tab`}
    element={<TermsOfUse />}
  />
  <Route
    path={paths.homeLearning._}
    element={<HomeLearning />}
  />
  <Route
    path={paths.getInvolved._}
    element={<GetInvolved />}
  />
  <Route
    path={paths.codingClubs._}
    element={<CodingClubs />}
  />
  <Route
    path={paths.communicationPreferences._}
    element={<CommunicationPreferences />}
  />
  <Route
    path={paths.contribute._}
    element={<Contribute />}
  />
  <Route
    path={`${paths.login._}/:userType/:view?`}
    element={<Login />}
  />
  <Route
    path={`${paths.resetPassword._}/:userType`}
    element={<ResetPassword />}
  />
  <Route
    path={paths.register._}
    element={<Register />}
  />
  <Route
    path={`${paths.register.emailVerification._}/:userType`}
    element={<EmailVerification />}
  />
  <Route
    path={paths.teacher._}
    element={<Teacher />}
  />
  <Route
    path={paths.teacher.onboarding._}
    element={<TeacherOnboarding />}
  />
  <Route
    path={`${paths.teacher.dashboard._}/:tab`}
    element={<TeacherDashboard />}
  />
  <Route
    path={paths.student._}
    element={<Student />}
  />
  <Route
    path={paths.student.dashboard._}
    element={<StudentDashboard />}
  />
  <Route
    path={`${paths.error._}/:type/:userType?`}
    element={<Error />}
  />
  <Route
    path='*' // Page not found
    element={<Error />}
  />
</>;

export default routes;
