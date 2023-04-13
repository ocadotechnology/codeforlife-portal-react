import React from 'react';

import BasePage from 'pages/BasePage';
import PageBanner from 'components/PageBanner';
import PageSection from 'components/PageSection';
import AboutRR from './AboutRR';
import LevelInfos from './LevelInfos';

import HomeLearningHeroImage from 'images/home_learning_hero_hexagon.png';

const HomeLearning: React.FC = () => {
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

      <LevelInfos />
    </BasePage>
  );
};

export default HomeLearning;
