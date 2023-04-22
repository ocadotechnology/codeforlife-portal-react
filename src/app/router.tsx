import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from 'pages/home/Home';
import Teachers from 'pages/teachers/Teachers';
import Students from 'pages/students/Students';
import Register from 'pages/register/Register';
import AboutUs from 'pages/aboutUs/AboutUs';
import CodingClubs from 'pages/codingClubs/CodingClubs';
import GetInvolved from 'pages/getInvolved/GetInvolved';
import HomeLearning from 'pages/homeLearning/HomeLearning';
import PrivacyNotice from 'pages/privacyNotice/PrivacyNotice';
import TermsOfUse from 'pages/termsOfUse/TermsOfUse';
import Newsletter from 'pages/newsletter/Newsletter';
import Forbidden from 'pages/forbidden/Forbidden';
import PageNotFound from 'pages/pageNotFound/PageNotFound';
import InternalServerError from 'pages/internalServerError/InternalServerError';

export const paths = {
  home: '/',
  teachers: '/teachers',
  students: '/students',
  register: '/register',
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
  rapidRouter: '/rapid-router'
};

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.teachers,
    element: <Teachers />
  },
  {
    path: paths.students,
    element: <Students />
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
  }
]);

export default router;
