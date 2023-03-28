import React from 'react';
import {
  Unstable_Grid2 as Grid,
  GridDirection,
  Grid2Props
} from '@mui/material';
import { Image } from 'codeforlife/lib/esm/components';
import { ResponsiveStyleValue } from '@mui/system';

type GridElement = React.ReactElement<typeof Grid>;

export interface ContentImageColumnProps {
  img: { alt: string, src: string, maxWidth: string },
  content: GridElement | GridElement[],
  contentContainerProps?: Grid2Props,
  direction?: ResponsiveStyleValue<GridDirection>
};

export const ContentImageColumn: React.FC<ContentImageColumnProps> = ({
  img,
  content,
  contentContainerProps = {},
  direction = 'row'
}) => {
  return (
    <Grid container xs={12} spacing={5} display='flex' direction={direction}>
      <Grid xs={4} md={6} className='flex-center'>
        <Image alt={img.alt} src={img.src} boxProps={{ sx: { maxWidth: img.maxWidth } }} />
      </Grid>
      <Grid xs={8} md={6} {...contentContainerProps}>
        {content}
      </Grid>
    </Grid >
  );
};
