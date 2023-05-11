import { createTheme, ThemeOptions } from '@mui/material/styles';

import { theme as cflTheme } from 'codeforlife';

// Styles shared by all form components.
export const formStyleOverrides = {
  fontFamily: '"Inter"',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '12px'
};

const options: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: '24px'
    },
    h2: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: '22px'
    },
    h3: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: '20px'
    },
    h4: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: '18px'
    },
    h5: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: '16px'
    },
    h6: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: '14px'
    },
    body1: {
      fontFamily: '"Inter"',
      fontSize: '18px',
      marginBottom: '16px'
    },
    body2: {
      fontFamily: '"Inter"',
      fontSize: '16px',
      marginBottom: '14px'
    },
    button: {
      fontFamily: '"Inter"',
      fontSize: '14px',
      fontWeight: 550
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'tertiary'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'black',
          padding: '5px 20px',
          width: 'fit-content'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white',
          border: '2px solid white',
          '&.Mui-selected': {
            color: cflTheme.palette.primary.light,
            backgroundColor: 'white'
          }
        }
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
        root: {
          background: 'white',
          margin: 0
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'body' && {
            ...(cflTheme.components?.MuiLink?.styleOverrides?.root as Record<string, unknown>),
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
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          // @ts-expect-error root is defined in the CFL package.
          ...cflTheme.components?.MuiContainer?.styleOverrides?.root({ ownerState }),
          padding: 0
        })
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...formStyleOverrides,
          marginTop: 4,
          marginLeft: 4
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'white'
        }
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
  }
};

const theme = createTheme(cflTheme, options);

export default theme;
