import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  Button,
  Typography,
  Stack
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';

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
      <Typography variant='h5' textAlign='center'>
        You still have classes associated with this account
      </Typography>
      <Typography>
        Review classes if you would like to download the scoreboard or transfer students first.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Button onClick={() => {
          navigate(paths.teacher.dashboard.classes._);
        }}>
          Review classes
        </Button>
        <Button
          className='alert'
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
