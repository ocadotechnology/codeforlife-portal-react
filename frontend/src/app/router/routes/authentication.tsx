import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../../../pages/login/Login';
import Register from '../../../pages/register/Register';
import EmailVerification from '../../../pages/emailVerification/EmailVerification';
import ResetPassword from '../../../pages/resetPassword/ResetPassword';
import paths from '../paths';

const authentication = <>
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

export default authentication;
