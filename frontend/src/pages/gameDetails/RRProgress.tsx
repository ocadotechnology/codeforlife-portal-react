import React from 'react';
import { Unstable_Grid2 as Grid, Button, Stack, Typography } from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Image } from 'codeforlife/lib/esm/components';
import RRLogoImage from '../../images/RR_logo.svg';
import { paths } from 'app/router';

const RRProgress: React.FC = () => {
  // TODO: fetch from login detail
  const completedLevels = 0;
  const topScores = 0;
  const score = 0;
  const availablePoints = 2070;

  return (
    <Stack textAlign='center'>
      <Grid xs={12} className='flex-center' marginY={2}>
        <Image alt={'RR_logo'} src={RRLogoImage} maxWidth='200px' />
      </Grid>
      <Typography variant='h4'>
        You have completed {completedLevels} Rapid Router levels!
      </Typography>
      <Typography variant='h4'>
        You have {topScores} top scores!
      </Typography>
      <Typography variant='h4'>
        You have a score of {score}. There are {availablePoints} available points.
      </Typography>
      <Grid xs={12} className='flex-center' marginY={2}>
        <Button
          endIcon={<ChevronRightIcon />}
          href={paths.rapidRouter} // TODO: change to RR dashboard
        >
          Check scoreboard
        </Button>
      </Grid>
    </Stack>
  );
};

export default RRProgress;
