import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Grid2Props,
  Container,
  Breakpoint
} from '@mui/material';

export interface PageSectionProps extends Pick<Grid2Props, (
  'bgcolor'
)> {
  children: React.ReactNode
  py?: boolean
}

const PageSection: React.FC<PageSectionProps> = ({
  bgcolor, children, py = true
}) => {
  return <>
    <Grid
      xs={12}
      bgcolor={bgcolor}
      py={py ? { xs: 1, sm: 2, md: 3 } : 0}
      px={0} // TODO: fix with theme
    >
      <Container maxWidth={process.env.REACT_APP_CONTAINER_MAX_WIDTH as Breakpoint}>
        {children}
      </Container>
    </Grid>
  </>;
};

export default PageSection;
