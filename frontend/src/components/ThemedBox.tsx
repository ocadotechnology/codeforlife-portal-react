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
  overrideComponentsRootStyles
} from 'codeforlife/lib/esm/helpers';

export interface ThemedBoxProps extends BoxProps {
  withIcons?: boolean,
  bgcolor: 'primary' | 'secondary' | 'tertiary'
}

const ThemedBox: React.FC<ThemedBoxProps> = ({
  withIcons = false,
  bgcolor,
  children,
  sx,
  ...otherBoxProps
}) => {
  let theme = useTheme();

  let circleColor: ThemedBoxProps['bgcolor'];
  let hexagonColor: ThemedBoxProps['bgcolor'];
  switch (bgcolor) {
    case 'primary':
      circleColor = 'secondary';
      hexagonColor = 'tertiary';
      break;
    case 'secondary':
      circleColor = 'tertiary';
      hexagonColor = 'primary';
      break;
    case 'tertiary':
      circleColor = 'primary';
      hexagonColor = 'secondary';
      break;
  }

  const commonIconSxProps: SxProps = {
    display: { xs: 'none', md: 'block' },
    fontSize: '200px',
    position: 'absolute'
  };

  const contrastTextColor = theme.palette[bgcolor].contrastText;
  theme = overrideComponentsRootStyles(
    [
      'MuiTypography',
      'MuiFormHelperText',
      'MuiLink'
    ],
    {
      color: contrastTextColor,
      textDecorationColor: contrastTextColor
    },
    theme
  );

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
