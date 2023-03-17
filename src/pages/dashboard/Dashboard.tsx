import React from 'react';
import {
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import Header from 'features/header/Header';
import Footer from 'features/footer/Footer';

import TargetAudience from './TargetAudience';
import AboutUs from './AboutUs';
import Quotes from './Quotes';
import CodingClubs from './CodingClubs';

import EducateImage from 'images/dashboard_educate.png';
import PlayImage from 'images/dashboard_play.png';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid xs={12}>
        <Header />
      </Grid>
      <Grid xs={12} md={6}>
        <TargetAudience
          bgColor={theme.palette.primary.main}
          imgAlt='teacher with student'
          imgSrc={EducateImage}
          header='Educate'
          msg='Helping teachers and families to inspire the next generation of computer scientists.'
          btnText='Learn more'
          btnLink=''
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TargetAudience
          bgColor={theme.palette.secondary.main}
          imgAlt='kids playing'
          imgSrc={PlayImage}
          header='Play'
          msg="Anyone can learn how to code. We will help you learn how. It's fun, free and easy."
          btnText='Learn more'
          btnLink=''
        />
      </Grid>
      <Grid xs={12}>
        <AboutUs />
      </Grid>
      <Grid xs={12}>
        <Quotes />
      </Grid>
      <Grid xs={12}>
        <CodingClubs />
      </Grid>
      <Grid xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
