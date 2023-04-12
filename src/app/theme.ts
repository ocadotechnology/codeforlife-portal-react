import { createTheme, ThemeOptions } from '@mui/material/styles';

import { theme as cflTheme } from 'codeforlife';

// import '../fonts/SpaceGrotesk-VariableFont_wght.ttf';

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
    // TODO: https://mui.com/material-ui/customization/typography/#self-hosted-fonts
    // MuiCssBaseline: {
    //   styleOverrides: `
    //     @font-face {
    //       font-family: "SpaceGrotesk";
    //       src: local("SpaceGrotesk"), url("../../../fonts/SpaceGrotesk-VariableFont_wght.ttf") format("truetype");
    //     }
    //   `
    // }
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
    }
    // MuiContainer: {
    //   styleOverrides: {
    //     root: {
    //       '&.MuiContainer-root': {
    //         padding: 0
    //       }
    //     }
    //   }
    // },
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
