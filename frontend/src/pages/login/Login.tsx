import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { BaseFormProps } from './BaseForm';
import IndependentForm from './IndependentForm';
import StudentForm from './StudentForm';
import TeacherForm from './TeacherForm';

const Login: React.FC<{
  userType: 'teacher' | 'student' | 'independent';
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
      verifyEmail: yup.boolean().default(false)
    })
  );
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Page.Container>
      {searchParams?.verifyEmail === true && (
        <Page.Notification>
          Your email address was successfully verified, please log in.
        </Page.Notification>
      )}
      <Page.Section maxWidth="md">{form}</Page.Section>
    </Page.Container>
  );
};

export default Login;
