import { createTheme } from '@mui/material/styles';

import { theme as cflTheme } from 'codeforlife';

// import '../fonts/SpaceGrotesk-VariableFont_wght.ttf';

const theme = createTheme(cflTheme, {
  typography: {
    h1: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500
    },
    h2: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500
    },
    h3: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500
    },
    h4: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500
    },
    h5: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500
    },
    h6: {
      fontFamily: '"SpaceGrotesk"',
      fontWeight: 500
    },
    body1: {
      fontFamily: '"Inter"'
    },
    body2: {
      fontFamily: '"Inter"'
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
          padding: '5px 20px'
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
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: any }) => ({
          ...(ownerState.className === 'normalText' && {
            fontSize: '18px',
            marginTop: '16px',
            marginBottom: '16px'
          }),
          ...(ownerState.className === 'headerText' && {
            marginBottom: '24px'
          })
        })
      }
    }
  }
});

export default theme;
