import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon
} from '@mui/icons-material';

import Page from 'codeforlife/lib/esm/components/page';

import { paths } from '../../app/router';
import AboutRR from './AboutRR';
import Levels from './Levels';

import HomeLearningHeroImage from '../../images/home_learning_hero_hexagon.png';

const HomeLearning: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Page.Container>
      <Page.Banner
        imageProps={{ alt: 'homeLearningHero', src: HomeLearningHeroImage }}
        header='Home learning'
        subheader={'Whether you\'re a parent, a caregiver, or a curious student — our Rapid Router game is easy to use and free - forever.'}
      />
      <Page.Section>
        <AboutRR />
      </Page.Section>
      <Levels />
      <Page.Section className='flex-end-x'>
        <Button onClick={() => { navigate(paths.register._); }}>
          Register now
        </Button>
      </Page.Section>
      <Page.Section
        gridProps={{ bgcolor: theme.palette.tertiary.main }}
        className='flex-center-x'
        sx={{ paddingY: (theme) => theme.spacing(2) }}
      >
        <Button
          endIcon={<SendIcon />}
          href={process.env.REACT_APP_IDEAS_BOX_HREF as string}
          target='_blank'
        >
          Let us know your feedback
        </Button>
      </Page.Section>
    </Page.Container>
  );
};

export default HomeLearning;
