import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon
} from '@mui/icons-material';

import {
  Form,
  CheckboxField,
  PasswordField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { setFormErrors } from 'codeforlife/lib/esm/helpers/formik';

import { paths } from '../../app/router';
import { useDeleteAccountMutation } from '../../app/api';
import TeacherDialog from './TeacherDialog';

export interface DeleteAccountFormProps {
  userType: 'teacher' | 'independent'
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
  userType
}) => {
  const navigate = useNavigate();
  const [deleteAccount] = useDeleteAccountMutation();
  const [dialog, setDialog] = React.useState<{
    open: boolean;
    onDeleteAccount?: () => void;
  }>({ open: false });

  return <>
    <Typography variant='h5'>
      Delete account
    </Typography>
    <Typography>
      If you no longer wish to have a Code for Life account, you can delete it by confirming below. You will receive an email to confirm this decision.
    </Typography>
    <Typography fontWeight='bold'>
      This can&apos;t be reversed. All classes you&apos;ve created will be permanently erased.
    </Typography>
    <Form
      initialValues={{
        password: '',
        unsubscribeNewsletter: false
      }}
      onSubmit={(values, { setErrors }) => {
        // TODO: validate if teacher has classes. If not, delete account immediately.
        setDialog({
          open: true,
          onDeleteAccount: () => {
            deleteAccount(values)
              .unwrap()
              // TODO: ensure user is logged out.
              .then(() => { navigate(paths._); })
              .catch((error) => {
                setFormErrors(error, setErrors);
                setDialog({ open: false });
              });
          }
        });
      }}
    >
      <Grid container columnSpacing={4} paddingBottom={3}>
        <Grid xs={12} sm={6}>
          <PasswordField
            placeholder='Current password'
            helperText='Enter your current password'
            required
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <CheckboxField
            name='unsubscribeNewsletter'
            formControlLabelProps={{
              label: 'Please remove me from the newsletter and marketing emails too.'
            }}
          />
        </Grid>
      </Grid>
      <SubmitButton
        className='alert'
        endIcon={<DeleteOutlineIcon />}
      >
        Delete account
      </SubmitButton>
    </Form>
    {userType === 'teacher' && dialog.onDeleteAccount !== undefined &&
      <TeacherDialog
        open={dialog.open}
        onClose={() => { setDialog({ open: false }); }}
        onDeleteAccount={dialog.onDeleteAccount}
      />
    }
  </>;
};

export default DeleteAccountForm;
