import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button
} from '@mui/material';

import { Image, ImageProps } from 'codeforlife/lib/esm/components';

import BasePage from '../pages/BasePage';
import { paths } from '../app/router';
import PageSection from './PageSection';

export interface ErrorTemplateProps {
  header: string,
  subheader: string,
  body: string,
  img: Pick<ImageProps, 'alt' | 'src'>
};

const BaseErrorPage: React.FC<ErrorTemplateProps> = ({
  header, subheader, body, img
}) => {
  return (
    <BasePage>
      <PageSection>
        <Grid container>
          <Grid
            xs={12} sm={8}
            order={{ xs: 2, sm: 1 }}
            className='flex-center'
          >
            <Stack>
              <Typography variant='h2'>
                {header}
              </Typography>
              <Typography variant='h5'>
                {subheader}
              </Typography>
              <Typography>
                {body}
              </Typography>
              <Button href={paths.home}>
                Back to homepage
              </Button>
            </Stack>
          </Grid>
          <Grid
            xs={12} sm={4}
            order={{ xs: 1, sm: 2 }}
            className='flex-center'
          >
            <Image
              {...img}
              boxProps={{
                maxWidth: '200px'
              }}
            />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default BaseErrorPage;
