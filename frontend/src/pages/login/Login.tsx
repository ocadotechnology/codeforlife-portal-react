import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';
import { BaseFormProps } from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

import { useSearchParams } from 'react-router-dom';

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

  const [searchParams] = useSearchParams();

  return (
    <Page.Container>
      {
        searchParams.get('verify_email')
          ? <Page.Notification>
            Your email address was successfully verified, please log in.
          </Page.Notification>
          : <></>
      }
      <Page.Section maxWidth='md'>
        {form}
      </Page.Section>
    </Page.Container>
  );
};

export default Login;
