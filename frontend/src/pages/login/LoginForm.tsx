import Cookies from 'js-cookie';
import React from 'react';
import {
  NavigateOptions,
  To as NavigateTo,
  useNavigate
} from 'react-router-dom';

import { ContainerState } from 'codeforlife/lib/esm/components/page';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';

import {
  LoginQuery,
  useLoginMutation
} from '../../app/api/login';
import { paths } from '../../app/router';
import BaseForm, { BaseFormProps } from './BaseForm';

type AuthFactor = 'otp';

export interface LoginFormProps
  extends Omit<BaseFormProps<LoginQuery>, 'onSubmit'> {
  authFactors?: {
    includes: AuthFactor;
    pathToFirstStep: string;
  };
  onSubmit: (authFactors: AuthFactor[]) => {
    navigateTo: NavigateTo;
    navigateOptions?: NavigateOptions;
    isEnd: boolean;
  };
}

const LoginForm: React.FC<LoginFormProps> = ({
  authFactors,
  onSubmit,
  ...baseFormProps
}) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  function getSessionAuthFactors(): AuthFactor[] | undefined {
    const cookie = Cookies.get('sessionid_httponly_false');
    return cookie === undefined
      ? undefined
      : cookie.split(',').filter(af => af !== '') as AuthFactor[];
  }

  React.useEffect(() => {
    if (authFactors === undefined) return;

    let errorMessage = '';
    const sessionAuthFactors = getSessionAuthFactors();
    if (sessionAuthFactors === undefined) {
      errorMessage = 'You have not started your login session.';
    } else if (!sessionAuthFactors.includes(authFactors.includes)) {
      errorMessage = 'You are not required to submit this authentication' +
        ' factor.';
    }

    if (errorMessage !== '') {
      const state: ContainerState = {
        notifications: [
          {
            props: {
              error: true,
              children: errorMessage
            }
          }
        ]
      };

      navigate(authFactors.pathToFirstStep, { state });
    }
  }, []);

  return (
    <BaseForm
      {...baseFormProps}
      onSubmit={submitForm(login, {
        then: () => {
          const sessionAuthFactors = getSessionAuthFactors() as AuthFactor[];
          const authFlow = onSubmit(sessionAuthFactors);

          if (authFlow.isEnd && sessionAuthFactors.length !== 0) {
            const state: ContainerState = {
              notifications: [
                {
                  props: {
                    error: true,
                    children: 'Session has unhandled authentication' +
                      ' factors pending. Please contact support.'
                  }
                }
              ]
            };

            authFlow.navigateTo = paths.error.internalServerError._;
            authFlow.navigateOptions = { state };
          }

          navigate(authFlow.navigateTo, authFlow.navigateOptions);
        }
      })}
    />
  );
};
export default LoginForm;
