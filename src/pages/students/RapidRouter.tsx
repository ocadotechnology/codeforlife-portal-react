import React from 'react';
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

import { Image } from 'codeforlife/lib/esm/components';

import RapidRouterImage from 'images/rapid_router_landing_hero.png';
import RapidRouterIcon from 'images/RR_logo.svg';

const RapidRouter: React.FC = () => {
  return (
    <Grid container>
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
          boxProps={{
            style: { width: '50%' }
          }}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Stack>
          <Typography variant='h5'>
            Starting with Blockly
          </Typography>
          <Typography>
            Starting with Blockly, you can learn to become a coding superhero, amaze your friends with your high scores. Create levels for your friends and compete for the most coins.
          </Typography>
          <Typography>
            If you are not part of a school, you can <Link className='body'>register here</Link>.
          </Typography>
          <Button endIcon={<LaunchIcon />}>
            Learn more about Blockly
          </Button>
          <Button endIcon={<ChevronRightIcon />}>
            Play Rapid Router
          </Button>
        </Stack>
      </Grid>
      <Grid xs={12} sm={6}>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube-nocookie.com/embed/w0Pw_XikQSs'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
          style={{ border: '0px' }}
        />
      </Grid>
    </Grid>
  );
};

export default RapidRouter;
