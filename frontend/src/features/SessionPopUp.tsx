import React from 'react';
import {
  Stack,
  Button,
  Dialog,
  Typography
} from '@mui/material';

const SessionPopUp: React.FC<{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  interval: number
}> = ({ open, setOpen, interval }) => {
  const minute = '2';
  const second = '00';
  const handleClose = (): void => {
    setOpen(false);
    setTimeout(() => { setOpen(true); }, interval);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
      >
        <Stack alignItems='center' margin={3}>
          <Typography variant='h5' textAlign='center'>
            Where did you go? 👀
          </Typography>
          <Typography textAlign='center'>
            We noticed that you have been inactive for a while. Are you still there? For your
            online safety we will log you out in:
          </Typography>
          <Typography variant='h5' textAlign='center'>
            {minute} min {second} secs
          </Typography>
          <Typography textAlign='center'>
            You may lose progress unless you continue or save.
          </Typography>
          <Button onClick={handleClose} autoFocus>
            Wait, I&apos;m still here!
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default SessionPopUp;
