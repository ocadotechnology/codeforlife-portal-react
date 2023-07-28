import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';
import { BaseFormProps } from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

import * as yup from 'yup';

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

  return (
    <Page.Container>
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
