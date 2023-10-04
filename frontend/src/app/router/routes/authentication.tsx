import { Route } from 'react-router-dom';

// eslint-disable-next-line max-len
import EmailVerification from '../../../pages/emailVerification/EmailVerification';
import Login from '../../../pages/login/Login';
import Register from '../../../pages/register/Register';
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
    path={paths.login.teacher._}
    element={<Login form={<Login.Form.Teacher.Credentials />} />}
  />
  <Route
    path={paths.login.teacher.otp._}
    element={<Login form={<Login.Form.Teacher.Otp />} />}
  />
  <Route
    path={paths.login.teacher.otp.bypassToken._}
    element={<Login form={<Login.Form.Teacher.OtpBypassToken />} />}
  />
  <Route
    path={paths.login.student._}
    element={<Login form={<Login.Form.Student.AccessCode />} />}
  />
  <Route
    path={paths.login.student.class._}
    element={<Login form={<Login.Form.Student.Credentials />} />}
  />
  <Route
    path={paths.login.independent._}
    element={<Login form={<Login.Form.Independent.Credentials />} />}
  />
</>;

export default authentication;
