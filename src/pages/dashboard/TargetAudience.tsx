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
    <Grid container sx={{ bgcolor: bgColor }}>
      <Grid xs={12} className='flex-center'>
        <Image alt={imgAlt} src={imgSrc} boxProps={{ maxWidth: '450px' }} />
      </Grid>
      <Grid xs={12}>
        <Typography variant='h1'>
          {header}
        </Typography>
      </Grid>
      <Grid xs={8}>
        <Typography>
          {msg}
        </Typography>
      </Grid>
      <Grid xs={4}>
        <Button>
          {btnText + ' >'}
        </Button>
      </Grid>
    </Grid >
  );
};

export default TargetAudience;
