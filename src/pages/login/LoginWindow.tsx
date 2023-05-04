import React from 'react';
import { LoginWindowProps } from './interfaces';
import { useTheme, Grid, Box } from '@mui/material';
import Circle from './Circle';
import Polygon from './Polygon';

const LG_MARGIN_GRID_VALUE = 3.5;
const MD_MARGIN_GIRD_VALUE = 2;
const SM_MARGIN_GRID_VALUE = 1;

const LoginWindow: React.FC<LoginWindowProps> = ({ userType, children }) => {
  const theme = useTheme();
  const windowBackgroundColour = {
    teacher: theme.palette.primary.main,
    independent: theme.palette.tertiary.main,
    student: theme.palette.secondary.main
  };
  return (
    <Grid container>
      <Grid
        item
        xs={SM_MARGIN_GRID_VALUE}
        md={MD_MARGIN_GIRD_VALUE}
        lg={LG_MARGIN_GRID_VALUE}
      ></Grid>
      <Grid
        item
        xs={12 - 2 * SM_MARGIN_GRID_VALUE}
        md={12 - 2 * MD_MARGIN_GIRD_VALUE}
        lg={12 - 2 * LG_MARGIN_GRID_VALUE}
        sx={{
          background: windowBackgroundColour[userType],
          margin: { xs: '0.5rem 0', Typsm: '1rem 0', md: '2rem 0' },
          padding: { xs: '2rem 2rem', sm: '2rem 4rem', md: '2rem 6rem' },
          position: 'relative'
        }}
      >
        <Box sx={{ visibility: { sm: 'hidden', md: 'visible' } }}>
          <Circle userType={userType} />
          <Polygon userType={userType} />
        </Box>
        {children}
      </Grid>
      <Grid
        item
        xs={SM_MARGIN_GRID_VALUE}
        md={MD_MARGIN_GIRD_VALUE}
        lg={LG_MARGIN_GRID_VALUE}
      ></Grid>
    </Grid>
  );
};

export default LoginWindow;
