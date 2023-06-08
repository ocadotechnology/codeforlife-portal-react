import React from 'react';
import {
  Stack,
  Button,
  Dialog,
  Typography
} from '@mui/material';
import Timer from './Timer';

const SessionPopUp: React.FC<{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}> = ({ open, setOpen }) => {
  const handleClose = (): void => {
    setOpen(false);
    // TODO: close the popup after 2 mins and call the logout endpoint
  };

  return (
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
        <Timer delaySecond={120} />
        <Typography textAlign='center'>
          You may lose progress unless you continue or save.
        </Typography>
        <Button onClick={handleClose} autoFocus>
          Wait, I&apos;m still here!
        </Button>
      </Stack>
    </Dialog>
  );
};

export default SessionPopUp;
