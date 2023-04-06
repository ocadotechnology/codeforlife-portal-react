import React from 'react';
import {
  Stack,
  Unstable_Grid2 as Grid,
  Button
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';
import BasePage from 'pages/BasePage';
import { paths } from 'app/router';

export interface ErrorTemplateProps {
  children: React.ReactNode,
  img: { alt: string, src: string },
};

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
  children, img
}) => {
  return (
    <BasePage>
      <Grid xs={12} className='flex-center'>
        <Stack p={3}>
          {children}
          <Button style={{ marginTop: 'auto' }} href={paths.home}>
            Back to homepage
          </Button>
        </Stack>
        <Image
          alt={img.alt}
          src={img.src}
          boxProps={{
            display: { xs: 'none', md: 'block' },
            maxWidth: '300px'
          }}
        />
      </Grid>
    </BasePage>
  );
};

export default ErrorTemplate;
