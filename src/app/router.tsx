import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from 'pages/dashboard/Dashboard';
import Teachers from 'pages/teachers/Teachers';
import Students from 'pages/students/Students';
import Register from 'pages/register/Register';
import AboutUs from 'pages/aboutUs/AboutUs';
import CodingClubs from 'pages/codingClubs/CodingClubs';
import GetInvolved from 'pages/getInvolved/GetInvolved';
import HomeLearning from 'pages/homeLearning/HomeLearning';
import PrivacyNotice from 'pages/privacyNotice/PrivacyNotice';
import TermsOfUse from 'pages/termsOfUse/TermsOfUse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/teachers',
    element: <Teachers />
  },
  {
    path: '/students',
    element: <Students />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/about-us',
    element: <AboutUs />
  },
  {
    path: '/coding-clubs',
    element: <CodingClubs />
  },
  {
    path: '/get-involved',
    element: <GetInvolved />
  },
  {
    path: '/home-learning',
    element: <HomeLearning />
  },
  {
    path: '/privacy-notice',
    element: <PrivacyNotice />
  },
  {
    path: '/terms-of-use',
    element: <TermsOfUse />
  }
]);

export default router;
