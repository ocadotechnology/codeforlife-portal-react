import React from 'react';
import {
  useTheme,
  useMediaQuery
} from '@mui/material';

import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import TargetAudience from './TargetAudience';
import AboutUs from './AboutUs';
import Quotes from './Quotes';
import CodingClubs from './CodingClubs';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <PageSection background={`linear-gradient(
        to ${useMediaQuery(theme.breakpoints.down('sm')) ? 'bottom' : 'right'},
        ${theme.palette.primary.main} 50%,
        ${theme.palette.secondary.main} 0
      )`}>
        <TargetAudience />
      </PageSection>
      <PageSection>
        <AboutUs />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
        <Quotes />
      </PageSection>
      <PageSection>
        <CodingClubs />
      </PageSection>
    </BasePage>
  );
};

export default Home;
