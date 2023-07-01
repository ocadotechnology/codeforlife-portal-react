import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import KuronoLogoImage from '../../images/kurono_logo.svg';

const KuronoProgress: React.FC<{
  isDependent: boolean,
}> = ({ isDependent }) => {
  // TODO: fetch from api store.
  const challengeLevel = 1;

  return (
    <Stack
      spacing={3}
      alignItems='center'
    >
      <Image
        alt={'kurono_logo'}
        src={KuronoLogoImage}
        maxWidth='300px'
      />
      <Typography variant='h4' textAlign='center'>
        {isDependent
          ? `You are exploring Challenge ${challengeLevel} with your class!`
          : 'Kurono is only available as part of a school or club. Your teacher, parent or guardian can set up a club for you and create a class.'
        }
      </Typography>
      {isDependent
        ? <Image
          title="Kurono active game"
          alt="Kurono active game"
          src="https://storage.googleapis.com/codeforlife-assets/images/worksheets/future.jpg"
          maxWidth='800px'
        />
        : <video
          loop
          autoPlay
          muted
          width='100%'
        >
          <source
            src={require('../../videos/aimmo_play_now_background_video.mp4')}
            type="video/mp4"
          />
        </video>
      }
    </Stack>
  );
};

export default KuronoProgress;
