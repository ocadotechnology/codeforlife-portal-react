import React from 'react';
import {
  useTheme
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TargetAudience from './TargetAudience';
import AboutUs from './AboutUs';
import Quotes from './Quotes';
import CodingClubs from './CodingClubs';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Page.Container>
      {/* Special case: un-contained page section */}
      <TargetAudience />
      <Page.Section>
        <AboutUs />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Quotes />
      </Page.Section>
      <Page.Section>
        <CodingClubs />
      </Page.Section>
    </Page.Container>
  );
};

export default Home;
