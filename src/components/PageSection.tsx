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
  px?: boolean
  py?: boolean
  background?: string
}

const PageSection: React.FC<PageSectionProps> = ({
  bgcolor, children, px = true, py = true, background
}) => {
  return <>
    <Grid
      xs={12}
      py={py ? { xs: 1, sm: 2, md: 3 } : 0}
      px={px ? { xs: 3, sm: 2, md: 1 } : 0}
      sx={{ background, bgcolor }}
    >
      <Container maxWidth='lg'>
        {children}
      </Container>
    </Grid>
  </>;
};

export default PageSection;
