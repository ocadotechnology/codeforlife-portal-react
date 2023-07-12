import React from 'react';
import {
  useTheme
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TargetAudience from './TargetAudience';
import AboutUs from './AboutUs';
import Quotes from './Quotes';
import CodingClubs from './CodingClubs';
import { useLocation } from 'react-router-dom';
import NewsSignUp from './NewsSignUp';

const Home: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Page.Container>
      <NewsSignUp signUpSuccess={location.state?.signUpSuccess} />
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
