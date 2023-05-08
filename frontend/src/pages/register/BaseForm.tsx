import React from 'react';
import {
  useTheme,
  createTheme,
  ThemeProvider,
  Stack,
  StackProps,
  Typography
} from '@mui/material';

const BaseForm: React.FC<{
  header: string,
  subheader: string,
  description: string,
  color: string,
  bgcolor: StackProps['bgcolor'],
  children: StackProps['children']
}> =
  ({
    header,
    subheader,
    description,
    color,
    bgcolor,
    children
  }) => (
    <ThemeProvider theme={createTheme(useTheme(), {
      components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              color: 'white',
              fontWeight: 500
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              background: 'transparent'
            }
          }
        }
      }
    })}>
      <Stack bgcolor={bgcolor} p={3}>
        <Typography variant='h4' textAlign='center'>
          {header}
        </Typography>
        <Typography>
          {subheader}
        </Typography>
        <Typography variant='form'>
          {description}
        </Typography>
        {children}
      </Stack>
    </ThemeProvider>
  );

export default BaseForm;