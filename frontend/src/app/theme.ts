import {
  createTheme,
  ThemeOptions,
  tabClasses
} from '@mui/material';

import { theme as cflTheme } from 'codeforlife';
import { getStyleOverrides } from 'codeforlife/lib/esm/helpers';
import typography from 'codeforlife/lib/esm/theme/typography';

// Styles shared by all form components.
export const formStyleOverrides = {
  fontFamily: '"Inter"',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '12px'
};

const components: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      color: 'tertiary'
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiButton'),
        textTransform: 'none',
        color: 'black',
        padding: '5px 20px',
        width: 'fit-content',
        '&:hover': {
          backgroundColor: 'inherit'
        }
      })
    }
  },
  MuiFormControlLabel: {
    defaultProps: {
      sx: {
        '.MuiTypography-root': {
          ...formStyleOverrides,
          m: 0
        }
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiInputBase'),
        background: 'white',
        margin: 0
      })
    }
  },
  MuiLink: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiLink'),
        ...(ownerState.className === 'body' && {
          color: 'black',
          textDecorationColor: 'black',
          textDecoration: 'underline',
          ':hover': {
            fontWeight: 'bold'
          }
        })
      })
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiFormHelperText'),
        ...formStyleOverrides,
        marginTop: 4,
        marginLeft: 4
      })
    }
  },
  MuiCheckbox: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiCheckbox'),
        color: 'white'
      })
    }
  },
  MuiTextField: {
    defaultProps: {
      size: 'small'
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiTextField'),
        backgroundColor: 'transparent',
        '& .MuiOutlinedInput-root.Mui-focused > fieldset': {
          borderColor: '#000'
        }
      })
    }
  },
  MuiTable: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiTable'),
        marginBottom: typography.body1?.marginBottom
      })
    }
  }
  // MuiToolbar: {
  //   styleOverrides: {
  //     root: {
  //       '&.MuiToolbar-root': {
  //         padding: 0
  //       }
  //     }
  //   }
  // }
};

const options: ThemeOptions = {
  typography,
  components
};

const theme = createTheme(cflTheme, options);

export default theme;
