import React from 'react';
import {
  Button,
  Stack,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Image } from 'codeforlife/lib/esm/components';
import RRLogoImage from '../../images/RR_logo.svg';
import { paths } from '../../app/routes';

const RapidRouterProgress: React.FC<{
  isDependent: boolean
}> = ({ isDependent }) => {
  // TODO: get this from api store.
  const completedLevels = 0;
  const topScores = 0;
  const score = 0;
  const availablePoints = 2070;

  return (
    <Stack
      alignItems='center'
      textAlign='center'
    >
      <Image
        alt={'RR_logo'}
        src={RRLogoImage}
        maxWidth='200px'
      />
      <Typography variant='h4'>
        You have completed {completedLevels} Rapid Router levels!
      </Typography>
      <Typography variant='h4'>
        You have {topScores} top scores!
      </Typography>
      <Typography variant='h4'>
        You have a score of {score}. There are {availablePoints} available points.
      </Typography>
      {isDependent &&
        <Button
          style={{ marginTop: 20 }}
          endIcon={<ChevronRightIcon />}
          href={paths.rapidRouter._}
        >
          Check scoreboard
        </Button>
      }
    </Stack>
  );
};

export default RapidRouterProgress;
