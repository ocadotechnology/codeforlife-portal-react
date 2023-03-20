import React from 'react';
import {
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import BasePage from 'pages/BasePage';

import TargetAudience from './TargetAudience';
import AboutUs from './AboutUs';
import Quotes from './Quotes';
import CodingClubs from './CodingClubs';

import EducateImage from 'images/dashboard_educate.png';
import PlayImage from 'images/dashboard_play.png';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <Grid xs={12} sm={6} bgcolor={theme.palette.primary.main}>
        <TargetAudience
          img={{ alt: 'teacher with student', src: EducateImage }}
          text={{ header: 'Educate', body: 'Helping teachers and families to inspire the next generation of computer scientists.' }}
          btn={{ text: 'Learn more', link: '' }}
        />
      </Grid>
      <Grid xs={12} sm={6} bgcolor={theme.palette.secondary.main}>
        <TargetAudience
          img={{ alt: 'kids playing', src: PlayImage }}
          text={{ header: 'Play', body: "Anyone can learn how to code. We will help you learn how. It's fun, free and easy." }}
          btn={{ text: 'Get started', link: '' }}
        />
      </Grid>
      <Grid xs={12}>
        <AboutUs />
      </Grid>
      <Grid xs={12} bgcolor={theme.palette.info.main}>
        <Quotes />
      </Grid>
      <Grid xs={12}>
        <CodingClubs />
      </Grid>
    </BasePage>
  );
};

export default Dashboard;
