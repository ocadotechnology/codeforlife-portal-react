import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  GridDirection
} from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import { YouTubeVideo } from 'codeforlife/lib/esm/components';

export interface TeacherSectionProps {
  children: React.ReactNode,
  videoSource: string,
  direction?: ResponsiveStyleValue<GridDirection>
}

const TeacherSection: React.FC<TeacherSectionProps> = ({
  children,
  videoSource,
  direction = 'row'
}) => {
  return (
    <Grid container spacing={3} direction={direction}>
      <Grid xs={12} md={6}>
        <Stack height='100%'>
          {children}
        </Stack>
      </Grid>
      <Grid xs={12} md={6} className='flex-center'>
        <YouTubeVideo src={videoSource} />
      </Grid>
    </Grid>
  );
};

export default TeacherSection;
