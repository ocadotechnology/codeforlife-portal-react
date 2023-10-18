import React from 'react';
import * as yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';

import BaseForm, { BaseFormProps } from './BaseForm';
import independentForms from './independentForms';
import studentForms from './studentForms';
import teacherForms from './teacherForms';

const Login: React.FC<{
  form: React.ReactElement<BaseFormProps<any>, typeof BaseForm>;
}> & {
  Form: {
    Independent: typeof independentForms;
    Student: typeof studentForms;
    Teacher: typeof teacherForms;
  };
} = ({ form }) => {
  const searchParams = tryValidateSync(
    fromSearchParams(),
    yup.object({
      verifyEmail: yup.boolean().default(false)
    })
  );

  return (
    <Page.Container>
      {searchParams?.verifyEmail && (
        <Page.Notification>
          Your email address was successfully verified, please log in.
        </Page.Notification>
      )}
      <Page.Section maxWidth='md'>
        {form}
      </Page.Section>
    </Page.Container>
  );
};

Login.Form = {
  Independent: independentForms,
  Student: studentForms,
  Teacher: teacherForms
};

export default Login;
