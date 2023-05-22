import React from 'react';
import {
  Button,
  Unstable_Grid2 as Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { paths } from '../../app/router';
import { YouTubeVideo } from 'codeforlife/lib/esm/components';

const RR: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6} className='flex-center'>
        <YouTubeVideo src={process.env.REACT_APP_RR_FOR_TEACHER_YOUTUBE_VIDEO_SRC as string} />
      </Grid>
      <Grid xs={12} md={6}>
        <Stack height='100%'>
          <Typography variant='h5'>
            Rapid router
          </Typography>
          <Typography>
            Rapid Router is a fun and engaging education resource that helps teach the first principles of computer programming covered in the UK Computing curriculum.
          </Typography>
          <Typography>
            Built on &apos;Blockly&apos;, an easy-to-use visual programming language, Rapid Router enables teachers to monitor and manage individual pupil progress and identify where more support is required.
          </Typography>
          <Typography>
            See how the Rapid Router fits into&nbsp;
            <Link
              href={process.env.REACT_APP_INTRO_TO_CODING_ENGLAND}
              color="inherit"
              underline="always"
              target="_blank">
              English national curriculum — the computer science strand
            </Link>
            &nbsp;and&nbsp;
            <Link
              href={process.env.REACT_APP_INTRO_TO_CODING_SCOTLAND}
              color="inherit"
              underline="always"
              target="_blank">
              the Scottish curriculum.
            </Link>
          </Typography>
          <Button
            endIcon={<ChevronRightIcon />}
            style={{
              marginTop: 'auto',
              marginLeft: 'auto'
            }}
            href={paths.rapidRouter}
          >
            Try out Rapid Router
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RR;
