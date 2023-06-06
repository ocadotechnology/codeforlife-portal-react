import React from 'react';
import {
  Button,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';
import BasePage from '../../pages/BasePage';
import PageBanner from '../../components/PageBanner';
import PageSection from '../../components/PageSection';
import AboutRR from './AboutRR';
import Levels from './Levels';

import HomeLearningHeroImage from '../../images/home_learning_hero_hexagon.png';

const HomeLearning: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <PageBanner
        img={{ alt: 'homeLearningHero', src: HomeLearningHeroImage }}
        text={{
          title: 'Home learning',
          content: 'Whether you\'re a parent, a caregiver, or a curious student — our Rapid Router game is easy to use and free - forever.'
        }}
      />
      <PageSection>
        <AboutRR />
      </PageSection>
      <Levels />
      <PageSection className='flex-end-x'>
        <Button href={paths.register._}>
          Register now
        </Button>
      </PageSection>
      <PageSection
        bgcolor={theme.palette.secondary.main}
        className='flex-center-x'
      >
        <Button
          endIcon={<SendIcon />}
          href={process.env.REACT_APP_IDEAS_BOX_HREF as string}
          target='_blank'
        >
          Let us know your feedback
        </Button>
      </PageSection>
    </BasePage>
  );
};

export default HomeLearning;
