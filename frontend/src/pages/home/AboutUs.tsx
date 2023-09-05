import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button,
  Link
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';

import PieChartIcon from '../../images/icon_piechart.png';
import ControllerIcon from '../../images/icon_controller.png';
import TicketIcon from '../../images/icon_free.png';
import GlobeIcon from '../../images/icon_globe.png';

const Column: React.FC<{
  img: { alt: string, src: string },
  children: React.ReactNode,
}> = ({ img, children }) => (
  <Grid xs={12} sm={6} md={3}>
    <Stack alignItems='center'>
      <Image
        alt={img.alt}
        src={img.src}
        maxWidth='200px'
      />
      {children}
    </Stack>
  </Grid>
);

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container columnSpacing={2}>
      <Grid xs={12}>
        <Typography variant='h4' textAlign='center'>
          Giving everyone the ability to shape technology&apos;s future
        </Typography>
      </Grid>
      <Column img={{ alt: 'pie chart', src: PieChartIcon }}>
        <Typography textAlign='center'>
          Just 16% of university computer science graduates (2018/19) in the UK were women
          <Link href={process.env.REACT_APP_STEM_WOMEN_GRADUATE_HREF} color="inherit" underline="always" target="_blank">*</Link>
          , we want to change that.
        </Typography>
      </Column>
      <Column img={{ alt: 'game controller', src: ControllerIcon }}>
        <Typography textAlign='center'>
          Gamification helps children learn whilst having fun!
        </Typography>
      </Column>
      <Column img={{ alt: 'free ticket', src: TicketIcon }}>
        <Typography textAlign='center'>
          That&apos;s right, free forever: our gift to you! We&apos;re also Open Source.
        </Typography>
      </Column>
      <Column img={{ alt: 'earth', src: GlobeIcon }}>
        <Typography textAlign='center'>
          Code for Life has over 350,000 registered users across the world.
        </Typography>
      </Column>
      <Grid xs={12} display='flex' justifyContent='end'>
        <Button
          onClick={() => { navigate(paths.aboutUs._); }}
          endIcon={<ChevronRightIcon />}
        >
          About us
        </Button>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
