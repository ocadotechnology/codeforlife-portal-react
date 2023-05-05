import { createTheme, ThemeOptions } from '@mui/material/styles';

import { theme as cflTheme } from 'codeforlife';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    form: true;
  }
}

const options: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: 24
    },
    h2: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: 22
    },
    h3: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: 20
    },
    h4: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: 18
    },
    h5: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: 16
    },
    h6: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500,
      marginBottom: 14
    },
    body1: {
      fontFamily: '"Inter"',
      fontSize: 18,
      marginBottom: 16
    },
    body2: {
      fontFamily: '"Inter"',
      fontSize: 16,
      marginBottom: 14
    },
    button: {
      fontFamily: '"Inter"',
      fontSize: 14,
      fontWeight: 550
    }
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'form' },
          style: {
            fontFamily: '"Inter"',
            fontSize: 14,
            marginBottom: 12
          }
        }
      ]
    },
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
          '.MuiTypography-root': { m: 0 }
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
          margin: '4px 0 8px 4px'
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
