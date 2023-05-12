import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import PageSection from 'components/PageSection';

const Banner: React.FC<{
  isStudent: boolean,
  name: string
}> = ({ isStudent, name }) => {
  const theme = useTheme();

  return (
    <PageSection
      bgcolor={isStudent ? theme.palette.tertiary.main : theme.palette.secondary.main}
      py={false}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        py={{ xs: 8, md: 16 }}
      >
        <Typography variant='h2' color={isStudent ? 'black' : 'White'}>
          Welcome, {name}
        </Typography>
        <Typography variant='h4' color={isStudent ? 'black' : 'White'}>
          This is where you can access your games
        </Typography>
      </Stack>
    </PageSection>
  );
};
export default Banner;
