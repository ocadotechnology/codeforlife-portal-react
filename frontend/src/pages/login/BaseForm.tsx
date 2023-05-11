import React, { ReactNode } from 'react';
import {
  Stack,
  Typography,
  type StackProps,
  Box,
  useTheme,
  createTheme
} from '@mui/material';
import Circle from './Circle';
import Polygon from './Polygon';
import { userType } from 'components/types';
import { ThemeProvider } from '@emotion/react';

interface BaseFormProps {
  header: string;
  subheader: string;
  children: StackProps['children'];
  userType: userType;
}

const StackStyle: React.CSSProperties = {
  position: 'relative'
};

interface BaseFormThemeProps {
  children: ReactNode;
  color: StackProps['color'];
}

const BaseFormTheme: React.FC<BaseFormThemeProps> = ({
  children,
  color
}): JSX.Element => {
  return (
    <ThemeProvider
      theme={createTheme(useTheme(), {
        components: {
          MuiTypography: {
            styleOverrides: {
              root: { color, fontWeight: 500 }
            }
          },
          MuiTextField: {
            styleOverrides: {
              root: { background: 'transparent' }
            }
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: { color }
            }
          }
        }
      })}
    >
      {children}
    </ThemeProvider>
  );
};

const BaseForm: React.FC<BaseFormProps> = ({
  header,
  subheader,
  children,
  userType
}): JSX.Element => {
  const theme = useTheme();
  const bgColor = {
    teacher: theme.palette.primary.main,
    independent: theme.palette.tertiary.main,
    student: theme.palette.secondary.main
  };
  const textColor = {
    teacher: theme.palette.primary.contrastText,
    independent: theme.palette.tertiary.contrastText,
    student: theme.palette.primary.contrastText
  };
  return (
    <BaseFormTheme color={textColor[userType]}>
      <Stack
        bgcolor={bgColor[userType]}
        py={5}
        px={15}
        mx={20}
        height="100%"
        color={textColor[userType]}
        sx={StackStyle}
      >
        <Typography align="center" variant="h4">
          {header}
        </Typography>
        <Typography align="center" variant="h5">
          {subheader}
        </Typography>
        <Box sx={{ visibility: { sm: 'hidden', md: 'visible' } }}>
          <Circle userType={userType} />
          <Polygon userType={userType} />
        </Box>
        {children}
      </Stack>
    </BaseFormTheme>
  );
};

export default BaseForm;
