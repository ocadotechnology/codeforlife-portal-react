import React from 'react';
import {
  Button,
  Unstable_Grid2 as Grid, Link, Stack, Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { paths } from '../../app/router';
import { YouTubeVideo } from 'codeforlife/lib/esm/components';

const Kurono: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Stack height='100%'>
          <Typography variant='h5'>
            Kurono
          </Typography>
          <Typography>
            Kurono is our multiplayer game that is also aligned to the National Curriculum. It is aimed at Key stages 3 and 4 and concentrates on text-based programming using Python. Students follow a set of challenges that enable them to embed their skills by completing the exercises alongside their classmates.
          </Typography>
          <Typography>
            <Link
              href={process.env.REACT_APP_KURONO_AND_CURRICULUM}
              color="inherit"
              underline="always"
              target="_blank">
              See how Kurono relates to Key Stages 3 & 4 of the computer science strand here.
            </Link>
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
        <YouTubeVideo src={process.env.REACT_APP_KURONO_FOR_TEACHER_YOUTUBE_VIDEO_SRC as string} />
      </Grid>
    </Grid>
  );
};

export default Kurono;
