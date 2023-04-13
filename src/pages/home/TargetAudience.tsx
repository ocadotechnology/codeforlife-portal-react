import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

const TargetAudience: React.FC<{
  img: { alt: string, src: string }
  text: { header: string, body: string }
  btn: { text: string, href: string }
}> = ({ img, text, btn }) => {
  return (
    <Grid
      container
      sx={{ height: '100%', minWidth: '100%' }}
      padding={4}
      spacing={1}
    >
      <Grid xs={12} className='flex-center'>
        <Image
          alt={img.alt}
          src={img.src}
          maxWidth='450px'
        />
      </Grid>
      <Grid xs={12}>
        <Typography variant='h2' style={{ color: 'white' }}>
          {text.header}
        </Typography>
      </Grid>
      <Grid xs={12} md={8}>
        <Typography fontSize={21} style={{ color: 'white' }}>
          {text.body}
        </Typography>
      </Grid>
      <Grid
        xs={12} md={4}
        display='flex' justifyContent='end' alignItems='end'
      >
        <Button color='white' href={btn.href}>
          {btn.text} &gt;
        </Button>
      </Grid>
    </Grid >
  );
};

export default TargetAudience;
