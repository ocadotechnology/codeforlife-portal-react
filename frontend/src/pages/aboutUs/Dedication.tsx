import React from 'react';
import {
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import SharonHarrisonImage from '../../images/sharon_harrison.jpg';

const Dedication: React.FC = () => {
  return <>
    <Grid
      container
      xs={12}
      className='flex-center'
      direction='column'
      padding={3}
    >
      <Typography variant='h4' textAlign='center'>
        Dedicated to Sharon Harrison
      </Typography>
      <Image alt={'SharonHarrison'} src={SharonHarrisonImage} boxProps={{ maxWidth: '150px', margin: 3 }} />
      <Typography variant='h5' textAlign='center'>
        1956 — 2015
      </Typography>
    </Grid>
    <Grid xs={9} xsOffset={1.5} px={5}>
      <Typography variant='body2' fontWeight='bold'>
        Sharon was instrumental in helping to create Code for Life. At the beginning of 2014 she was recruited to act as our Educational Consultant. The project drew on her previous skills as a pioneering computing teacher and education consultant.
      </Typography>
      <Typography variant='body2' mb={3}>
        Sharon has left a lasting legacy by creating something which will help teach STEM skills to the next generation of computer scientists across the world.
      </Typography>
    </Grid>
  </>;
};

export default Dedication;
