import React from 'react';
import { Unstable_Grid2 as Grid, Button, Stack, Typography } from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Image } from 'codeforlife/lib/esm/components';
import KuronoLogoImage from '../../images/kurono_logo.svg';

const KuronoProgress: React.FC = () => {
  const challengeLevel = 1; // TODO: fetch from login detail

  return (
    <Stack>
      <Grid xs={12} className='flex-center' marginY={2}>
        <Image alt={'kurono_logo'} src={KuronoLogoImage} maxWidth='300px' />
      </Grid>
      <Typography variant='h4' textAlign='center'>
        You are exploring Challenge {challengeLevel} with your class!
      </Typography>
      <Grid xs={12} className='flex-center' marginY={2}>
        <Image
          title="Kurono active game"
          alt="Kurono active game"
          src="https://storage.googleapis.com/codeforlife-assets/images/worksheets/future.jpg"
          maxWidth='800px'
        />
      </Grid>
    </Stack>
  );
};

export default KuronoProgress;
