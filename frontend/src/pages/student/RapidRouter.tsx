import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  Stack,
  Link
} from '@mui/material';
import {
  Launch as LaunchIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { Image, YouTubeVideo } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';

import RapidRouterImage from '../../images/rapid_router_landing_hero.png';
import RapidRouterIcon from '../../images/RR_logo.svg';

const RapidRouter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={1}>
      <Grid xs={12}>
        <Typography variant='h4' textAlign='center'>
          Anyone can code, you can too!
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>
          Whether you&apos;re a parent, teacher or a student, our games support and guide you, making learning to code great fun. Get started with Rapid Router designed for students new to coding. Rapid Router is where you will build up your ability until you are ready to advance to Kurono, where you can test your skills in Python.
        </Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{
          backgroundImage: `url(${RapidRouterImage})`,
          backgroundSize: 'cover'
        }}
        className='flex-center'
      >
        <Image
          alt='Rapid Router Logo'
          src={RapidRouterIcon}
          style={{ width: '40%' }}
        />
      </Grid>
      <Grid xs={12} md={6} paddingTop={4}>
        <Stack height='100%'>
          <Typography variant='h5'>
            Starting with Blockly
          </Typography>
          <Typography>
            Starting with Blockly, you can learn to become a coding superhero, amaze your friends with your high scores. Create levels for your friends and compete for the most coins.
          </Typography>
          <Typography>
            If you are not part of a school, you can&nbsp;
            <Link onClick={() => { navigate(paths.register._); }}>
              register here
            </Link>
            .
          </Typography>
          <Button
            endIcon={<LaunchIcon />}
            style={{ marginTop: 'auto' }}
            className='body'
            href={process.env.REACT_APP_BLOCKLY_GUIDE_SRC as string}
            target='_blank'
          >
            Learn more about Blockly
          </Button>
          <Button
            endIcon={<ChevronRightIcon />}
            href={paths.rapidRouter._}
            sx={{ mb: { xs: 1, md: 0 } }}
          >
            Play Rapid Router
          </Button>
        </Stack>
      </Grid>
      <Grid xs={12} md={6} className='flex-center' paddingTop={4}>
        <YouTubeVideo src={process.env.REACT_APP_RAPID_ROUTER_YOUTUBE_VIDEO_SRC as string} />
      </Grid>
    </Grid >
  );
};

export default RapidRouter;
