import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Login2fa from '../pages/login/Login2fa';
import Login2faBackup from '../pages/login/Login2faBackup';
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
import Forbidden from '../pages/forbidden/Forbidden';
import PageNotFound from '../pages/pageNotFound/PageNotFound';
import InternalServerError from '../pages/internalServerError/InternalServerError';
import TeacherSchool from '../pages/teacherDashboard/TeacherSchool';
import TeacherClasses from '../pages/teacherDashboard/TeacherClasses';
import TeacherAccount from '../pages/teacherDashboard/account/TeacherAccount';
import Setup2fa from '../pages/teacherDashboard/account/2fa/Setup2fa';
import Setup2faComplete from '../pages/teacherDashboard/account/2fa/Setup2faComplete';
import BackupTokens from '../pages/teacherDashboard/account/2fa/BackupTokens';
import Disable2fa from '../pages/teacherDashboard/account/2fa/Disable2fa';
import EmailVerification from '../pages/emailVerification/EmailVerification';
import ResetPassword from '../pages/resetPassword/ResetPassword';
import StudentsDashboard from '../pages/studentsDashboard/StudentsDashboard';

export const paths = {
  home: '/',
  login: {
    _: '/login',
    teacher: '/login?userType=teacher',
    student: '/login?userType=student',
    independent: '/login?userType=independent'
  },
  login2fa: '/login2fa',
  login2faBackup: '/login2faBackup',
  resetPassword: {
    _: '/reset-password',
    teacher: '/reset-password?userType=teacher',
    independent: '/reset-password?userType=independent'
  },
  teachers: '/teachers',
  students: {
    _: '/students',
    dashboard: {
      _: '/students/dashboard',
      dependent: '/students/dashboard?userType=dependent',
      independent: '/students/dashboard?userType=independent'
    }
  },
  register: '/register',
  emailVerification: '/register/email-verification',
  aboutUs: '/about-us',
  codingClubs: '/coding-clubs',
  getInvolved: '/get-involved',
  homeLearning: '/home-learning',
  privacyNotice: '/privacy-notice',
  termsOfUse: '/terms-of-use',
  newsletter: '/newsletter',
  forbidden: '/error/forbidden',
  pageNotFound: '/error/page-not-found',
  internalServerError: '/error/internal-server-error',
  rapidRouter: '/rapid-router',
  teacherSchool: '/teacher/school',
  teacherClasses: '/teacher/classes',
  teacherAccount: '/teacher/account',
  setup2fa: '/teacher/account/2fa/setup',
  setup2faComplete: 'teacher/account/2fa/setup-complete',
  backupTokens: '/teacher/account/2fa/backup-tokens',
  disable2fa: '/teacher/account/2fa/disable',
  kurono: '/kurono'
};

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.login._,
    element: <Login />
  },
  {
    path: paths.login2fa,
    element: <Login2fa />
  },
  {
    path: paths.login2faBackup,
    element: <Login2faBackup />
  },
  {
    path: paths.teachers,
    element: <Teachers />
  },
  {
    path: paths.students._,
    element: <Students />
  },
  {
    path: paths.students.dashboard._,
    element: <StudentsDashboard />
  },
  {
    path: paths.register,
    element: <Register />
  },
  {
    path: paths.aboutUs,
    element: <AboutUs />
  },
  {
    path: paths.codingClubs,
    element: <CodingClubs />
  },
  {
    path: paths.getInvolved,
    element: <GetInvolved />
  },
  {
    path: paths.homeLearning,
    element: <HomeLearning />
  },
  {
    path: paths.privacyNotice,
    element: <PrivacyNotice />
  },
  {
    path: paths.termsOfUse,
    element: <TermsOfUse />
  },
  {
    path: paths.newsletter,
    element: <Newsletter />
  },
  {
    path: paths.forbidden,
    element: <Forbidden />
  },
  {
    path: paths.pageNotFound,
    element: <PageNotFound />
  },
  {
    path: paths.internalServerError,
    element: <InternalServerError />
  },
  {
    path: paths.teacherSchool,
    element: <TeacherSchool />
  },
  {
    path: paths.teacherClasses,
    element: <TeacherClasses />
  },
  {
    path: paths.teacherAccount,
    element: <TeacherAccount />
  },
  {
    path: paths.setup2fa,
    element: <Setup2fa />
  },
  {
    path: paths.setup2faComplete,
    element: <Setup2faComplete />
  },
  {
    path: paths.backupTokens,
    element: <BackupTokens />
  },
  {
    path: paths.disable2fa,
    element: <Disable2fa />
  },
  {
    path: paths.emailVerification,
    element: <EmailVerification />
  },
  {
    path: paths.resetPassword._,
    element: <ResetPassword />
  }
]);

export default router;
