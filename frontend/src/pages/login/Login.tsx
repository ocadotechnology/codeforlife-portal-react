import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchParams } from 'codeforlife/lib/esm/helpers';

import Page from 'codeforlife/lib/esm/components/page';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const userTypes = ['teacher', 'student', 'independent'] as const;
  const params = SearchParams.get<{
    userType: typeof userTypes[number];
  }>({
    userType: { validate: SearchParams.validate.inOptions(userTypes) }
  });

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.error.internalServerError._);
    }
  }, []);

  if (params === null) return <></>;

  let form: React.ReactElement<typeof BaseForm>;
  switch (params.userType) {
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
