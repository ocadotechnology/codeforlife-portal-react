import React from 'react';
import { useTheme } from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import HomeEducateHeroImage from '../../images/home_educate_hero_hexagon.png';
import Kurono from './Kurono';
import RapidRouter from './RapidRouter';
import Resources from './Resources';
import TeacherSlides from './TeacherSlides';

const Teacher: React.FC = () => {
  const theme = useTheme();

  return (
    <Page.Container>
      <Page.Banner
        imageProps={{ alt: 'homeEducateHero', src: HomeEducateHeroImage }}
        header='Educate'
        subheader='Get ready to teach the next generation of computer scientists'
      />
      <Page.Section>
        <TeacherSlides />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Resources />
      </Page.Section>
      <Page.Section>
        <RapidRouter />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Kurono />
      </Page.Section>
    </Page.Container>
  );
};

export default Teacher;
