import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from 'pages/dashboard/Dashboard';
import AboutUs from 'pages/dashboard/AboutUs';
import CodingClubs from 'pages/dashboard/CodingClubs';
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
