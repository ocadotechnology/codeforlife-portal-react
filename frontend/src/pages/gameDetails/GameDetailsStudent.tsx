import React from 'react';
import {
  useTheme
} from '@mui/material';

import BasePage from '../BasePage';
import PageSection from 'components/PageSection';
import Banner from './Banner';
import GameList from './GameList';
import RRProgress from './RRProgress';
import KuronoProgress from './KuronoProgress';

const GameDetailsStudent: React.FC = () => {
  const theme = useTheme();
  const name = 'username'; // TODO: fetch from login detail

  return (
    <BasePage>
      <Banner identity='indep' name={name} />

      <PageSection>
        <GameList />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <RRProgress />
      </PageSection>

      <PageSection>
        <KuronoProgress />
      </PageSection>
    </BasePage>
  );
};

export default GameDetailsStudent;
