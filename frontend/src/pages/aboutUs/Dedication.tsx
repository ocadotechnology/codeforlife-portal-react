import React from 'react';
import {
  Typography,
  Stack
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import SharonHarrisonImage from '../../images/sharon_harrison.jpg';

const Dedication: React.FC = () => {
  return <>
    <Stack alignItems='center'>
      <Typography variant='h4' textAlign='center'>
        Dedicated to Sharon Harrison
      </Typography>
      <Image
        alt={'SharonHarrison'}
        src={SharonHarrisonImage}
        maxWidth='150px'
        marginY={3}
      />
      <Typography variant='h5' textAlign='center'>
        1956 — 2015
      </Typography>
      <Stack>
        <Typography fontWeight='bold'>
          Sharon was instrumental in helping to create Code for Life. At the beginning of 2014 she was recruited to act as our Educational Consultant. The project drew on her previous skills as a pioneering computing teacher and education consultant.
        </Typography>
        <Typography mb={0}>
          Sharon has left a lasting legacy by creating something which will help teach STEM skills to the next generation of computer scientists across the world.
        </Typography>
      </Stack>
    </Stack>
  </>;
};

export default Dedication;
