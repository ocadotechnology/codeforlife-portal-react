import { Form } from 'codeforlife/lib/esm/components/form';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import { Button, Dialog, Stack, Typography } from '@mui/material';

import { useDeleteAccountMutation } from '../../app/api';
import { paths } from '../../app/router';

interface ConfirmPopupProps {
  open: boolean;
  password: string;
  unsubscribeNewsletter: boolean;
  userType: string;
  toggle: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
    }>
  >;
}
export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  open,
  userType,
  password,
  unsubscribeNewsletter,
  toggle
}) => {
  const navigate = useNavigate();
  const [deleteAccount] = useDeleteAccountMutation();
  return (
    <Dialog open={open}>
      <Typography variant="h5" textAlign="center">
        You are about to delete your account
      </Typography>
      <Typography>
        This action is not reversible. Are you sure you wish to proceed?
      </Typography>
      <Form
        initialValues={{
          password,
          unsubscribeNewsletter
        }}
        onSubmit={submitForm(deleteAccount, {
          then: (res) => {
            navigate(paths._);
          }
        })}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Button
            variant="outlined"
            onClick={() => {
              toggle({ open: !open });
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="alert"
            endIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        </Stack>
      </Form>
    </Dialog>
  );
};

interface TeacherDialogProps {
  open: boolean;
  onClose: () => void;
  onDeleteAccount: () => void;
}

const TeacherDialog: React.FC<TeacherDialogProps> = ({
  open,
  onClose,
  onDeleteAccount
}) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <Typography variant="h5" textAlign="center">
        You still have classes associated with this account
      </Typography>
      <Typography>
        Review classes if you would like to download the scoreboard or transfer
        students first.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Button
          onClick={() => {
            navigate(paths.teacher.dashboard.classes._);
          }}
        >
          Review classes
        </Button>
        <Button
          className="alert"
          endIcon={<DeleteOutlineIcon />}
          onClick={onDeleteAccount}
        >
          Delete
        </Button>
      </Stack>
    </Dialog>
  );
};

export default TeacherDialog;
