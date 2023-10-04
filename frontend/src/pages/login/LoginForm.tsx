import Cookies from 'js-cookie';
import React from 'react';
import {
  NavigateOptions,
  To as NavigateTo,
  useNavigate
} from 'react-router-dom';

import { ContainerState } from 'codeforlife/src/components/page';
import {
  isFormError,
  submitForm
} from 'codeforlife/src/helpers/formik';

import {
  LoginAuthFactor,
  LoginQuery,
  LoginResult,
  useLoginMutation
} from '../../app/api/login';
import { paths } from '../../app/router';
import BaseForm, { BaseFormProps } from './BaseForm';

export interface LoginFormProps
  extends Omit<BaseFormProps<LoginQuery>, 'onSubmit'> {
  authFactors?: {
    includes: LoginAuthFactor;
    pathToFirstStep: string;
  };
  onSubmit: (result: LoginResult) => {
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
  const [login, { data, error, isLoading }] = useLoginMutation();

  React.useEffect(() => {
    if (authFactors === undefined) return;

    let errorMessage = '';
    if (Cookies.get('sessionid') === undefined) {
      errorMessage = 'You have not started your login session.';
    } else if (data === undefined || (
      error !== undefined && !isFormError(error)
    )) {
      errorMessage = 'An error occurred when calling our server.';
    } else if (!data.authFactors.includes(authFactors.includes)) {
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
  }, [isLoading]);

  return (
    <BaseForm
      {...baseFormProps}
      onSubmit={submitForm(login, {
        then: (result) => {
          const authFlow = onSubmit(result);

          if (authFlow.isEnd && result.authFactors.length !== 0) {
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
