import React from 'react';
import {
  Box,
  BoxProps,
  ThemeProvider,
  useTheme,
  SxProps
} from '@mui/material';
import {
  Circle as CircleIcon,
  Hexagon as HexagonIcon
} from '@mui/icons-material';

import {
  overrideComponentsInTheme
} from 'codeforlife/lib/esm/helpers';

export interface ThemedBoxProps extends BoxProps {
  withIcons?: boolean,
  userType: 'teacher' | 'student' | 'independent'
}

const ThemedBox: React.FC<ThemedBoxProps> = ({
  withIcons = false,
  userType,
  children,
  sx,
  ...otherBoxProps
}) => {
  let theme = useTheme();

  type Color = 'primary' | 'secondary' | 'tertiary';
  let bgcolor: Color;
  let circleColor: Color;
  let hexagonColor: Color;
  let buttonBgcolor: string;
  switch (userType) {
    case 'teacher':
      bgcolor = 'primary';
      circleColor = 'secondary';
      hexagonColor = 'tertiary';
      buttonBgcolor = theme.palette.tertiary.main;
      break;
    case 'student':
      bgcolor = 'tertiary';
      circleColor = 'secondary';
      hexagonColor = 'primary';
      buttonBgcolor = theme.palette.tertiary.main;
      break;
    case 'independent':
      bgcolor = 'secondary';
      circleColor = 'primary';
      hexagonColor = 'tertiary';
      buttonBgcolor = 'white';
      break;
  }

  const commonIconSxProps: SxProps = {
    display: { xs: 'none', md: 'block' },
    fontSize: '200px',
    position: 'absolute'
  };

  const contrastText = theme.palette[bgcolor].contrastText;
  const commonStyleOverrides = {
    color: contrastText,
    textDecorationColor: contrastText
  };

  theme = overrideComponentsInTheme({
    MuiTypography: {
      styleOverrides: {
        root: { ...commonStyleOverrides }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { ...commonStyleOverrides }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: { ...commonStyleOverrides }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: buttonBgcolor,
          ...(ownerState.className === 'cancel' && {
            backgroundColor: 'transparent',
            border: `2px solid ${contrastText}`,
            color: contrastText
          })
        })
      }
    }
  }, theme);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...sx,
          bgcolor: theme.palette[bgcolor].main,
          paddingY: { xs: 2, sm: 3, md: 5 },
          paddingX: { xs: 2, sm: 5, md: 10 },
          alignItems: 'center',
          position: 'relative'
        }}
        {...otherBoxProps}
      >
        {withIcons && <>
          <CircleIcon
            color={circleColor}
            sx={{
              ...commonIconSxProps,
              top: '5%',
              left: '0%',
              transform: 'translate(-60%, 0%)'
            }}
          />
          <HexagonIcon
            color={hexagonColor}
            sx={{
              ...commonIconSxProps,
              bottom: '5%',
              right: '0%',
              transform: 'translate(60%, 0%) rotate(90deg)'
            }}
          />
        </>}
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default ThemedBox;
