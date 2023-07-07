import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';
import { CheckboxField, EmailField, Form, SubmitButton } from 'codeforlife/lib/esm/components/form';
import { useConsentFormMutation } from '../../app/api';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

const CommunicationPreferences: React.FC = () => {
  const theme = useTheme();

  const [sendConsentForm] = useConsentFormMutation();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  interface Values {
    email: string;
  }

  const initialValues: Values = {
    email: ''
  };

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>): void => {
    setSubmitting(false);
    sendConsentForm(values).unwrap()
      .then((res) => {
        if (res?.success === true) {
          navigate('/');
        } else {
          setNotificationOpen(true);
        }
      })
      .catch(() => {
      });
  };

  return (
    <Page.Container>
      <Page.Notification open={notificationOpen}>
        Valid email address and consent required. Please try again.
      </Page.Notification>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }} maxWidth='md'>
        <Typography variant='h4' align='center'>Your communication preferences</Typography>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <EmailField
            required
            placeholder="Email address"
            helperText="Enter your email address"
          />
          <CheckboxField
            name="updateDotmailerConsent"
            required
            formControlLabelProps={{
              label:
                'I confirm that I am happy to continue receiving email communication from Code for Life.'
            }}
          />
          <SubmitButton>Confirm</SubmitButton>
        </Form>
      </Page.Section>
    </Page.Container>
  );
};

export default CommunicationPreferences;
