import React from 'react';
import {
  useTheme
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';

import BasePage from '../../pages/BasePage';
import Characters from '../../features/characters/Characters';
import PageSection from '../../components/PageSection';
import PageBanner from '../../components/PageBanner';
import PlayImage from '../../images/home_play_hero.png';
import RapidRouter from './RapidRouter';
import Kurono from './Kurono';

const Students: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <PageBanner
        text={{
          title: 'Play',
          content: 'Anyone can learn how to code. We will help you learn how. It\'s fun, free and easy.'
        }}
        img={{
          alt: 'Child on tablet',
          src: PlayImage
        }}
        btn={{
          children: 'Play Rapid Router',
          endIcon: <ChevronRightIcon />,
          href: paths.rapidRouter
        }}
      />
      <PageSection>
        <RapidRouter />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
        <Characters game='rapid-router' />
      </PageSection>
      <PageSection>
        <Kurono />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
        <Characters game='kurono' />
      </PageSection>
    </BasePage>
  );
};

export default Students;
