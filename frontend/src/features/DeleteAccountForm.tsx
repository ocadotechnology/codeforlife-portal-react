import React from 'react';
import { useTheme } from '@mui/material';
import { CflHorizontalForm } from '../components/form/CflForm';
import { DELETE_ACCOUNT_INITIAL_VALUES } from '../pages/teacherDashboard/constants';
import { DELETE_ACCOUNT_SCHEMA } from '../pages/teacherDashboard/schemas';
import { CheckboxField, PasswordField, SubmitButton } from 'codeforlife/lib/esm/components/form';
import { DeleteOutline } from '@mui/icons-material';

const DeleteAccountForm: React.FC = () => {
  const theme = useTheme();
  return (
    <CflHorizontalForm
      header="Delete account"
      subheader="If you no longer wish to have a Code for Life account, you can delete it by confirming below. You will receive an email to confirm this decision."
      subheaderBold="This can't be reversed. All classes you've created will be permanently erased."
      initialValues={DELETE_ACCOUNT_INITIAL_VALUES}
      validationSchema={DELETE_ACCOUNT_SCHEMA}
      onSubmit={(formik, { setSubmitting }) => {
        alert(JSON.stringify(formik, null, 2));
        setSubmitting(false);
      }}
      submitButton={
        <SubmitButton
          className='alert'
          endIcon={<DeleteOutline />}
        >
          Delete account
        </SubmitButton>
      }
    >
      <PasswordField
        name="currentPassword"
        placeholder="Current password"
        helperText="Enter your current password"
      />
      <CheckboxField
        name="removeFromNewsletter"
        sx={{ color: theme.palette.info.dark }}
        formControlLabelProps={{
          label:
            'Please remove me from the newsletter and marketing emails too.'
        }}
      />
    </CflHorizontalForm>
  );
};

export default DeleteAccountForm;
