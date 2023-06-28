import React from 'react';
import { Typography, useTheme } from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';
import { CheckboxField, EmailField, Form, SubmitButton } from 'codeforlife/lib/esm/components/form';

const CommunicationPreferences: React.FC = () => {
  const theme = useTheme();

  interface Values {
    email: string;
  }

  const initialValues: Values = {
    email: ''
  };

  return (
    <Page.Container>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }} maxWidth='md'>
        <Typography variant='h4' align='center'>Your communication preferences</Typography>
        <Form
          initialValues={initialValues}
          onSubmit={(values) => {
            // TODO: Connect to backend and Dotmailer API
            console.log(values);
          }}
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
