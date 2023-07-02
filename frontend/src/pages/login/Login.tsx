import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import { paths } from '../../app/router';
import { BaseFormProps } from './BaseForm';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      userType: yup.string()
        .oneOf([
          'teacher',
          'student',
          'independent'
        ] as const)
        .required()
    }),
    {
      onError: () => {
        React.useEffect(() => {
          navigate(paths.error.pageNotFound._);
        }, []);
      }
    }
  );

  let form: React.ReactElement<BaseFormProps<any>> = <></>;
  switch (params?.userType) {
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
