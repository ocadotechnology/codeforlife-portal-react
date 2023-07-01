import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/helpers/router';
import { ThemedBox } from 'codeforlife/lib/esm/theme';

import { themeOptions } from '../../app/theme';
import { paths } from '../../app/routes';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      userType: yup.string()
        .oneOf([
          'teacher',
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

  if (params === undefined) return <></>;

  const searchParams = tryValidateSync(
    fromSearchParams(),
    yup.object({
      token: yup.string()
    })
  );

  return (
    <Page.Container>
      <Page.Section maxWidth='md'>
        <ThemedBox
          withShapes
          options={themeOptions}
          userType={params.userType}
        >
          {searchParams?.token !== undefined
            ? <PasswordForm
              userType={params.userType}
              token={searchParams.token}
            />
            : <EmailForm />
          }
        </ThemedBox>
      </Page.Section>
    </Page.Container>
  );
};

export default ResetPassword;
