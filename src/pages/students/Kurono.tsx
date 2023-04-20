import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Link,
  Button
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { Image, YouTubeVideo } from 'codeforlife/lib/esm/components';

import { paths } from 'app/router';

import KuronoImage from 'images/kurono_landing_hero.png';
import KuronoIcon from 'images/kurono_logo.svg';

const Kurono: React.FC = () => {
  return (
    <Grid container>
      <Grid
        xs={12}
        sx={{
          backgroundImage: `url(${KuronoImage})`,
          backgroundSize: 'cover'
        }}
        className='flex-center'
        p={10}
      >
        <Image
          alt='Kurono Logo'
          src={KuronoIcon}
          style={{ width: '40%' }}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <Stack height='100%'>
          <Typography variant='h5'>
            Progressing to Python
          </Typography>
          <Typography>
            Kurono guides you and makes learning to code great fun.
          </Typography>
          <Typography>
            Using Python, you can travel with your classmates through time to collect all the museum artefacts.
          </Typography>
          <Typography>
            Ask your teacher or tutor to&nbsp;
            <Link className='body' href={paths.register}>register</Link>.
          </Typography>
          <Button
            endIcon={<ChevronRightIcon />}
            sx={{ mt: 'auto', mb: { xs: 1, md: 0 } }}
          >
            Login to get started
          </Button>
        </Stack>
      </Grid>
      <Grid xs={12} md={6} className='flex-center'>
        <YouTubeVideo src={process.env.REACT_APP_KURONO_YOUTUBE_VIDEO_SRC as string} />
      </Grid>
    </Grid>
  );
};

export default Kurono;
