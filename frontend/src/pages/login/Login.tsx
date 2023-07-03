import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';
import { BaseFormProps } from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

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

  return (
    <Page.Container>
      <Page.Section maxWidth='md'>
        {form}
      </Page.Section>
    </Page.Container>
  );
};

export default Login;
