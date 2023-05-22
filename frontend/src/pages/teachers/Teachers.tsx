import React from 'react';
import {
  Unstable_Grid2 as Grid, useTheme
} from '@mui/material';

import HomeEducateHeroImage from '../../images/home_educate_hero_hexagon.png';
import BasePage from '../../pages/BasePage';
import PageBanner from '../../components/PageBanner';
import PageSection from '../../components/PageSection';
import Kurono from './Kurono';
import RR from './RR';
import Resources from './Resources';

const Teachers: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <PageBanner
        img={{ alt: 'homeEducateHero', src: HomeEducateHeroImage }}
        text={{
          title: 'Educate',
          content: 'Get ready to teach the next generation of computer scientists'
        }}
      />

      <PageSection>
        <RR />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <Resources />
      </PageSection>

      <PageSection>
        <RR />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <Kurono />
      </PageSection>

    </BasePage>
  );
};

export default Teachers;
