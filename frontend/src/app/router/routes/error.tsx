import React from 'react';
import { Route } from 'react-router-dom';

import Error from '../../../pages/error/Error';
import paths from '../paths';

const error = <>
  <Route
    path={`${paths.error._}/:type/:userType?`}
    element={<Error />}
  />
  <Route
    path='*' // Page not found
    element={<Error />}
  />
</>;

export default error;
