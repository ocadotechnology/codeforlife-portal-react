import React from 'react';
import {
  Button,
  Unstable_Grid2 as Grid,
  Stack,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { paths } from '../../app/router';
import { YouTubeVideo } from 'codeforlife/lib/esm/components';

const Resources: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <Stack height='100%'>
          <Typography variant='h5'>
            Resources and progress tracking
          </Typography>
          <Typography>
            Once you&apos;ve registered your personal details and logged in, you&apos;ll be able to create your school or club, or join other teachers at your institution.
          </Typography>
          <Typography>
            You can sign up your class, download free teaching packs, including sessions plans, pupil resources and assessment tools and track pupils&apos; progress. There are even videos to help you and your class understand what you&apos;ll be learning next.
          </Typography>
          <Button
            endIcon={<ChevronRightIcon />}
            style={{
              marginTop: 'auto'
            }}
            href={paths.register}
          >
            Register now
          </Button>
        </Stack>
      </Grid>
      <Grid xs={12} md={6} className='flex-center'>
        <YouTubeVideo src={process.env.REACT_APP_KURONO_YOUTUBE_VIDEO_SRC as string} />
      </Grid>
    </Grid>
  );
};

export default Resources;
