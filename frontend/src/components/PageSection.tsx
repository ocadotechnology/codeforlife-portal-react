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
  px?: boolean
  py?: boolean
  background?: string
  className?: string
  maxWidth?: Breakpoint
}

const PageSection: React.FC<PageSectionProps> = ({
  bgcolor,
  children,
  px = true,
  py = true,
  background,
  className,
  maxWidth = process.env.REACT_APP_CONTAINER_MAX_WIDTH as Breakpoint
}) => {
  return <>
    <Grid
      xs={12}
      py={py ? { xs: 1, sm: 2, md: 3 } : 0}
      px={px ? { xs: 3, sm: 2, md: 1 } : 0}
      sx={{ background, bgcolor }}
    >
      <Container
        maxWidth={maxWidth}
        className={className}
      >
        {children}
      </Container>
    </Grid>
  </>;
};

export default PageSection;
