import React from 'react';
import {
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import BasePage from 'pages/BasePage';

import { Image } from 'codeforlife/lib/esm/components';
import CodeClubHeroImage from 'images/coding_club_hero_hexagon.jpg';
import { PageBanner } from 'pages/aboutUs/AboutUs';

const CodingClubs: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <Grid xs={12}>
        <PageBanner bgcolor={theme.palette.primary.main} img={{ alt: 'codeClubHero', src: CodeClubHeroImage }} title='Coding clubs' description='A FREE set of slides and guides to run your own coding clubs' />
      </Grid>

      <Grid container xs={12} display='flex'>
        <Grid xs={2} />
        <Grid xs>
          <Stack>
            <Typography variant='h4' textAlign='center' my={5}>
              Who are the club packs aimed at?
            </Typography>
            <Typography fontSize={18}>
              The FREE resource packs are aimed at two different groups, the first is aimed at students ages between 7-11yrs with an interest in learning Python. The second pack is aimed at students 12yrs and up, including adults. This moves at a much faster pace and also introduces students to setting up an environment on their own computer.
            </Typography>
            <Typography fontSize={18} mt={3} mb={5}>
              Both packs are a condensed learning pathway using our game Rapid Router alongside suggested session plan and slides.
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={2} />
      </Grid>
    </BasePage>
  );
};

export default CodingClubs;
