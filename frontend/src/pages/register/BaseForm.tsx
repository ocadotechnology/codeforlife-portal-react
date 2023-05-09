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
  bgcolor: StackProps['bgcolor'],
  children: StackProps['children'],
  formHelperTextColor: string
}> =
  ({
    header,
    subheader,
    description,
    bgcolor,
    children,
    formHelperTextColor
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
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              color: formHelperTextColor
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
