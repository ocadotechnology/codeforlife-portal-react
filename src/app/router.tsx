import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from 'pages/dashboard/Dashboard';
import JokeListPage from 'pages/jokeList/JokeListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/joke-list-example',
    element: <JokeListPage />
  }
]);

export default router;
