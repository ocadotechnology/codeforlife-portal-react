import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchParams } from 'codeforlife/lib/esm/helpers';

import { paths } from '../../app/router';
import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import ThemedBox from '../../components/ThemedBox';
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
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;

  return (
    <BasePage>
      <PageSection maxWidth='md'>
        <ThemedBox withIcons userType={params.userType}>
          {params.token === undefined
            ? <EmailForm />
            : <PasswordForm
              userType={params.userType}
              token={params.token}
            />
          }
        </ThemedBox>
      </PageSection>
    </BasePage>
  );
};

export default ResetPassword;
