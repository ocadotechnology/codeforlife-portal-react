import { Button, Grid, useTheme } from '@mui/material';
import React from 'react';
import { paths } from '../../app/router';

const DashboardHeaderButton: React.FC<{
  active: boolean;
  text: string;
  href?: string;
}> = ({ active = false, text, href }): JSX.Element => {
  const theme = useTheme();
  const DashboardHeaderButtonStyle = {
    border: '2px solid !important',
    margin: 1,
    color: active
      ? theme.palette.primary.light
      : theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: active ? theme.palette.common.white : 'transparent'
    }
  };

  return (
    <Button
      href={href}
      color={'white'}
      variant={active ? 'contained' : 'outlined'}
      sx={DashboardHeaderButtonStyle}
    >
      {text}
    </Button>
  );
};
const DashboardHeader: React.FC<{ page: string }> = ({ page }): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid
      sx={{
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.light
      }}
      container
      columnSpacing={2}
      justifyContent="center"
    >
      <Grid item xs="auto">
        <DashboardHeaderButton
          active={page === 'Your school'}
          text="Your school"
          href={paths.teacher.dashboard.school._}
        />
      </Grid>
      <Grid item>
        <DashboardHeaderButton
          active={page === 'Your classes'}
          text="Your classes"
          href={paths.teacher.dashboard.classes._}
        />
      </Grid>
      <Grid item>
        <DashboardHeaderButton
          active={page === 'Your account'}
          text="Your account"
          href={paths.teacher.dashboard.account._}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardHeader;
