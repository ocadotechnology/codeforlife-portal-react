import React from 'react';
import { useNavigate } from 'react-router-dom';

import Page from 'codeforlife/lib/esm/components/page';
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import { ThemedBox } from 'codeforlife/lib/esm/theme';

import { themeOptions } from '../../app/theme';
import { paths } from '../../app/router';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const userTypes = ['teacher', 'independent'] as const;
  const params = SearchParams.get<{
    userType: typeof userTypes[number];
    token?: string;
  }>({
    userType: { validate: SearchParams.validate.inOptions(userTypes) },
    token: { isRequired: false }
  });

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.error.internalServerError._);
    }
  }, []);

  if (params === null) return <></>;

  return (
    <Page.Container>
      <Page.Section maxWidth='md'>
        <ThemedBox
          withIcons
          options={themeOptions}
          userType={params.userType}
        >
          {params.token === undefined
            ? <EmailForm />
            : <PasswordForm
              userType={params.userType}
              token={params.token}
            />
          }
        </ThemedBox>
      </Page.Section>
    </Page.Container>
  );
};

export default ResetPassword;
