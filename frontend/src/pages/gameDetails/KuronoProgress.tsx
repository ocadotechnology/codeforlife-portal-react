import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography
} from '@mui/material';
import { Image } from 'codeforlife/lib/esm/components';
import KuronoLogoImage from '../../images/kurono_logo.svg';

const KuronoProgress: React.FC<{
  isStudent: boolean,
}> = ({ isStudent }) => {
  const challengeLevel = 1; // TODO: fetch from login detail

  return (
    <Stack spacing={3}>
      <Grid xs={12} className='flex-center'>
        <Image alt={'kurono_logo'} src={KuronoLogoImage} maxWidth='300px' />
      </Grid>

      <Typography variant='h4' textAlign='center'>
        {isStudent
          ? `You are exploring Challenge ${challengeLevel} with your class!`
          : 'Kurono is only available as part of a school or club. Your teacher, parent or guardian can set up a club for you and create a class.'
        }
      </Typography>

      {isStudent
        ? <Grid xs={12} className='flex-center'>
          <Image
            title="Kurono active game"
            alt="Kurono active game"
            src="https://storage.googleapis.com/codeforlife-assets/images/worksheets/future.jpg"
            maxWidth='800px'
          />
        </Grid>
        : <Grid xs={12} className='flex-center'>
          <video loop autoPlay muted width='100%'>
            <source src={require('../../videos/aimmo_play_now_background_video.mp4')} type="video/mp4" />
          </video>
        </Grid>
      }
    </Stack>
  );
};

export default KuronoProgress;
