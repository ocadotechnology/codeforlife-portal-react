import React from 'react';

import { Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { paths } from 'app/router';
import BasePage from 'pages/BasePage';
import PageBanner from 'components/PageBanner';
import PageSection from 'components/PageSection';
import AboutRR from './AboutRR';
import LevelInfos from './LevelInfos';

import HomeLearningHeroImage from 'images/home_learning_hero_hexagon.png';

const HomeLearning: React.FC = () => {
  const feedbackHref = process.env.REACT_APP_IDEAS_BOX_HREF ? process.env.REACT_APP_IDEAS_BOX_HREF : '/';

  return (
    <BasePage containerProps={{ spacing: 0 }}>
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

      <LevelInfos />

      <PageSection>
        <Grid xs={12} display='flex' justifyContent='flex-end'>
          <Button href={paths.register}>
            Register now
          </Button>
        </Grid>
      </PageSection>

      <Grid container xs={12} display='flex' justifyContent='center' bgcolor='#00a3e0' paddingY={2}>
        <Button endIcon={<SendIcon />} href={feedbackHref} target="_blank">
          Let us know your feedback
        </Button>
      </Grid>

    </BasePage>
  );
};

export default HomeLearning;
