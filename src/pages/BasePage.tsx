import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Grid2Props,
  useTheme
} from '@mui/material';

import PageSection from 'components/PageSection';
import Header from 'features/header/Header';
import Footer from 'features/footer/Footer';

type GridElement = React.ReactElement<typeof Grid>;

const BasePage: React.FC<{
  children: GridElement | GridElement[],
  containerProps?: Grid2Props
}> = ({ children, containerProps = {} }) => {
  const theme = useTheme();

  let { spacing, ...props } = containerProps;
  spacing = spacing === undefined ? 1 : spacing;

  return (
    <Grid container spacing={spacing} {...props}>
      <Grid xs={12}>
        <Header />
      </Grid>
      {children}
      <PageSection bgcolor={theme.palette.primary.main}>
        <Footer />
      </PageSection>
    </Grid>
  );
};

export default BasePage;
