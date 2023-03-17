import { createTheme } from '@mui/material/styles';

import { theme as baseTheme } from 'codeforlife';

// import '../fonts/SpaceGrotesk-VariableFont_wght.ttf';

const theme = createTheme(baseTheme, {
  typography: {
    fontFamily: [
      '"SpaceGrotesk"',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: '"SpaceGrotesk"'
    },
    h2: {
      fontFamily: '"SpaceGrotesk"'
    },
    h3: {
      fontFamily: '"SpaceGrotesk"'
    },
    h4: {
      fontFamily: '"SpaceGrotesk"'
    },
    h5: {
      fontFamily: '"SpaceGrotesk"'
    },
    h6: {
      fontFamily: '"SpaceGrotesk"'
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
  }
});

export default theme;
