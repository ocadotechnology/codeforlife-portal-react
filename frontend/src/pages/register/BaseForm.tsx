import React from 'react';
import {
  useTheme,
  createTheme,
  ThemeProvider,
  Stack,
  StackProps,
  Typography,
  FormHelperText
} from '@mui/material';

const BaseForm: React.FC<{
  header: string,
  subheader: string,
  description: string,
  bgcolor: StackProps['bgcolor'],
  children: StackProps['children'],
  color: string
}> =
  ({
    header,
    subheader,
    description,
    bgcolor,
    children,
    color
  }) => (
    <ThemeProvider theme={createTheme(useTheme(), {
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
    })}>
      <Stack bgcolor={bgcolor} p={3} height='100%'>
        <Typography variant='h4' textAlign='center'>
          {header}
        </Typography>
        <Typography>
          {subheader}
        </Typography>
        <FormHelperText style={{ marginBottom: 30 }}>
          {description}
        </FormHelperText>
        {children}
      </Stack>
    </ThemeProvider>
  );

export default BaseForm;
