import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { SubmitButton, TextField } from 'codeforlife/lib/esm/components/form';
import { ContainerState } from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';

import { useLoginMutation } from '../../../app/api';
import { paths } from '../../../app/router';
import { accessCodeSchema } from '../../../app/schemas';
import BaseForm from '../BaseForm';

const AccessCode: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const searchParams = tryValidateSync(
    fromSearchParams(),
    Yup.object({
      userId: Yup.string().required(),
      loginId: Yup.string().required()
    })
  );

  if (searchParams !== undefined) {
    login(searchParams)
      .unwrap()
      .then(() => { navigate(paths.student.dashboard.dependent._); })
      .catch(() => {
        const state: ContainerState = {
          notifications: [
            {
              props: {
                error: true,
                children: 'Failed to automatically log in student. Please log' +
                  'in manually.'
              }
            }
          ]
        };

        navigate('.', { state });
      });
  }

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header='Welcome'
      subheader='Please enter your class code.'
      initialValues={{ accessCode: '' }}
      onSubmit={({ accessCode }) => {
        navigate(generatePath(
          paths.login.student.class._,
          { accessCode }
        ));
      }}
    >
      <TextField
        name='accessCode'
        placeholder='Access code'
        helperText='Enter your access code'
        validate={accessCodeSchema}
        required
      />
      <Typography variant='body2' fontWeight='bold'>
        Forgotten your login details? Please check with your teacher.
      </Typography>
      <SubmitButton
        stackProps={{ alignItems: 'end' }}
        endIcon={<ChevronRightIcon />}
      >
        Next
      </SubmitButton>
    </BaseForm>
  );
};

export default AccessCode;
