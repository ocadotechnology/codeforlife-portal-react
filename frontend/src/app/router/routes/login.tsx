import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../../../pages/login/Login';
import paths from '../paths';

const login = <>
  <Route
    path={`${paths.login.teacher._}/:view?`}
    element={<Login userType='teacher' />}
  />
  <Route
    path={`${paths.login.student._}/:accessCode?`}
    element={<Login userType='student' />}
  />
  <Route
    path={paths.login.independent._}
    element={<Login userType='independent' />}
  />
</>;

export default login;
