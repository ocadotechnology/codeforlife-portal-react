import React from 'react';
import {
  useTheme
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import Page from 'codeforlife/lib/esm/components/page';

import { paths } from '../../app/router';
import Characters from '../../features/characters/Characters';
import PlayImage from '../../images/home_play_hero.png';
import RapidRouter from './RapidRouter';
import Kurono from './Kurono';

const Student: React.FC = () => {
  const theme = useTheme();

  return (
    <Page.Container>
      <Page.Banner
        header='Play'
        subheader={'Anyone can learn how to code. We will help you learn how. It\'s fun, free and easy.'}
        imageProps={{
          alt: 'Child on tablet',
          src: PlayImage
        }}
        buttonProps={{
          children: 'Play Rapid Router',
          endIcon: <ChevronRightIcon />,
          href: paths.rapidRouter._
        }}
      />
      <Page.Section>
        <RapidRouter />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Characters game='rapid-router' />
      </Page.Section>
      <Page.Section>
        <Kurono />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Characters game='kurono' />
      </Page.Section>
    </Page.Container>
  );
};

export default Student;
