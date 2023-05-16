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
import KuronoCharacters from './KuronoCharacters';

const GameDetailsIndependent: React.FC = () => {
  const theme = useTheme();
  const name = 'username'; // TODO: fetch from login detail

  return (
    <BasePage>
      <Banner isStudent={false} name={name} />

      <PageSection>
        <GameList isStudent={false} />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main}>
        <RRProgress isStudent={false} />
      </PageSection>

      <PageSection>
        <KuronoProgress isStudent={false} />
      </PageSection>

      <PageSection bgcolor={theme.palette.info.main} >
        <KuronoCharacters />
      </PageSection>
    </BasePage>
  );
};

export default GameDetailsIndependent;
