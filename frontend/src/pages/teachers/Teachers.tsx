import React from 'react';
import { useTheme } from '@mui/material';

import HomeEducateHeroImage from '../../images/home_educate_hero_hexagon.png';
import BasePage from '../../pages/BasePage';
import PageBanner from '../../components/PageBanner';
import PageSection from '../../components/PageSection';
import Kurono from './Kurono';
import RapidRouter from './RapidRouter';
import Resources from './Resources';
import TeacherSlides from './TeacherSlides';

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
        <TeacherSlides />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <Resources />
      </PageSection>

      <PageSection>
        <RapidRouter />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <Kurono />
      </PageSection>

    </BasePage>
  );
};

export default Teachers;
