import React from 'react';
import {
  Stack,
  Button,
  Dialog,
  Typography
} from '@mui/material';
import { Image } from 'codeforlife/lib/esm/components';
import BrainImage from '../images/brain.svg';

const ScreenTimePopUp: React.FC<{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  interval: number
}> = ({ open, setOpen, interval }) => {
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
          <Image src={BrainImage} alt={'brain'} maxWidth={100} marginY={3} />
          <Typography variant='h5' textAlign='center'>
            Time for a break?
          </Typography>
          <Typography textAlign='center'>
            You have been using the Code for Life website for a while. Remember to take regular screen breaks to recharge those brain cells!
          </Typography>
          <Button onClick={handleClose} autoFocus>
            Continue
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default ScreenTimePopUp;
