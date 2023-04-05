import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Grid2Props,
  Container
} from '@mui/material';

export interface PageSectionProps extends Pick<Grid2Props, (
  'bgcolor'
)> {
  children: React.ReactNode
  py?: 0 | 1
}

const PageSection: React.FC<PageSectionProps> = ({
  bgcolor, children, py = 1
}) => {
  return <>
    <Grid
      xs={12}
      bgcolor={bgcolor}
      py={py}
      px={0} // TODO: fix with theme
    >
      <Container maxWidth='lg'>
        {children}
      </Container>
    </Grid>
  </>;
};

export default PageSection;
