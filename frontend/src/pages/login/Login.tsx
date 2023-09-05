import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';
import { BaseFormProps } from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

const Login: React.FC<{
  userType: 'teacher' | 'student' | 'independent'
}> = ({ userType }) => {
  let form: React.ReactElement<BaseFormProps<any>>;
  switch (userType) {
    case 'teacher':
      form = <TeacherForm />;
      break;
    case 'student':
      form = <StudentForm />;
      break;
    case 'independent':
      form = <IndependentForm />;
      break;
  }

  const searchParams = tryValidateSync(
    fromSearchParams(),
    yup.object({
      verifyEmail: yup.boolean()
        .default(false)
    })
  );
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Page.Container>
      {
        location.state?.notification &&
        <Page.Notification onClose={() => {
          delete location.state.notification;
          navigate(location.pathname, location.state);
        }}>
          {location.state.notification}
        </Page.Notification>
      }
      {searchParams?.verifyEmail === true &&
        <Page.Notification>
          Your email address was successfully verified, please log in.
        </Page.Notification>
      }
      <Page.Section maxWidth='md'>
        {form}
      </Page.Section>
    </Page.Container>
  );
};

export default Login;
