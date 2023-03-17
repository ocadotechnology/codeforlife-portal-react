import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

export interface TargetAudienceInterface {
  bgColor: string
  imgAlt: string
  imgSrc: string
  header: string
  msg: string
  btnText: string
  btnLink: string
}

const TargetAudience: React.FC<TargetAudienceInterface> = ({
  bgColor, imgAlt, imgSrc, header, msg, btnText, btnLink
}) => {
  return (
    <Grid
      container
      color='white'
      sx={{ bgcolor: bgColor, height: '100%', minWidth: '100%' }}
      padding={4}
      spacing={1}
    >
      <Grid xs={12} className='flex-center'>
        <Image alt={imgAlt} src={imgSrc} boxProps={{ maxWidth: '450px' }} />
      </Grid>
      <Grid xs={12}>
        <Typography variant='h3'>
          {header}
        </Typography>
      </Grid>
      <Grid xs={12} md={8}>
        <Typography>
          {msg}
        </Typography>
      </Grid>
      <Grid
        xs={12} md={4}
        display='flex' justifyContent='end' alignItems='end'
      >
        <Button color='white'>
          {btnText + ' >'}
        </Button>
      </Grid>
    </Grid >
  );
};

export default TargetAudience;
