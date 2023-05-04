import React from 'react';
import {
  Unstable_Grid2 as Grid,
} from '@mui/material';

import BasePage from '../../pages/BasePage';
import PageSection from 'components/PageSection';
import Banner from './Banner';
import GameList from './GameList';

const GameDetails: React.FC = () => {
  return (
    <BasePage>
      <Banner identity='indep' name='username' />

      <PageSection>
        <GameList />
      </PageSection>
    </BasePage>
  );
};

export default GameDetails;
