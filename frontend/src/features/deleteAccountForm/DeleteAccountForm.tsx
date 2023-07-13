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

import { paths } from '../../app/router';
import { useDeleteAccountMutation } from '../../app/api';
import TeacherDialog from './TeacherDialog';

export interface DeleteAccountFormProps {
  userType: 'teacher' | 'independent'
}

export interface DeleteAccountFormValues {
  password: string;
  unsubscribeNewsletter: boolean;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
  userType
}) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState<DeleteAccountFormValues>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteAccount] = useDeleteAccountMutation();

  function _deleteAccount(): void {
    if (values !== undefined) {
      deleteAccount(values)
        .unwrap()
        // TODO: ensure user is logged out.
        .then(() => { navigate(paths._); })
        // TOOD: handle failed to delete account.
        .catch(() => { });
    }
  }

  const initialValues: DeleteAccountFormValues = {
    password: '',
    unsubscribeNewsletter: false
  };

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
      initialValues={initialValues}
      onSubmit={(values) => {
        setValues(values);
        // TODO: validate if teacher has classes. If not, delete account immediately.
        setOpenDialog(true);
      }}
    >
      <Grid container columnSpacing={4}>
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
    <TeacherDialog
      open={userType === 'teacher' && values !== undefined && openDialog}
      onClose={() => { setValues(undefined); }}
      deleteAccount={_deleteAccount}
    />
  </>;
};

export default DeleteAccountForm;
