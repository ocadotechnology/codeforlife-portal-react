import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getSearchParams } from 'codeforlife/lib/esm/helpers';

import { paths } from '../../app/router';
import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import BaseForm from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

enum UserType {
  Teacher = 'teacher',
  Student = 'student',
  Independent = 'independent'
}

interface LoginParams {
  userType: UserType
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  let params = getSearchParams({
    userType: String
  }) as LoginParams | null;

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;
  else if (!Object.values(UserType).includes(params.userType)) {
    params = null;
    return <></>;
  }

  let form: React.ReactElement<typeof BaseForm>;
  switch (params.userType) {
    case UserType.Teacher:
      form = <TeacherForm />;
      break;
    case UserType.Student:
      form = <StudentForm />;
      break;
    case UserType.Independent:
      form = <IndependentForm />;
      break;
  }

  return (
    <BasePage>
      <PageSection maxWidth='md'>
        {form}
      </PageSection>
    </BasePage>
  );
};

export default Login;
