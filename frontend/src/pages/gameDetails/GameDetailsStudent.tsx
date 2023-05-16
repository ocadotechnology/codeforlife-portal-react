import React from 'react';
import {
  useTheme
} from '@mui/material';

import BasePage from '../BasePage';
import PageSection from '../../components/PageSection';
import Banner from './Banner';
import GameList from './GameList';
import RRProgress from './RRProgress';
import KuronoProgress from './KuronoProgress';

const GameDetailsStudent: React.FC = () => {
  const theme = useTheme();
  const name = 'username'; // TODO: fetch from login detail

  return (
    <BasePage>
      <Banner isStudent={true} name={name} />

      <PageSection>
        <GameList isStudent={true} />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <RRProgress isStudent={true} />
      </PageSection>

      <PageSection>
        <KuronoProgress isStudent={true} />
      </PageSection>
    </BasePage>
  );
};

export default GameDetailsStudent;
