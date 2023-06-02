import {
  createTheme,
  ThemeOptions,
  tabClasses
} from '@mui/material';

import { theme as cflTheme } from 'codeforlife';
import { getStyleOverrides } from 'codeforlife/lib/esm/helpers';

const typography: ThemeOptions['typography'] = {
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
};

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
  MuiTabs: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiTabs'),
        ...([undefined, 'horizontal'].includes(ownerState.orientation) && {
          [`.${tabClasses.root}:not(:last-of-type)`]: {
            marginRight: '30px'
          }
        })
      }),
      indicator: {
        display: 'none'
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiTab'),
        textTransform: 'none',
        fontSize: typography.body2?.fontSize,
        color: 'white',
        border: '2px solid white',
        [`&.${tabClasses.selected}`]: {
          color: cflTheme.palette.primary.light,
          backgroundColor: 'white',
          cursor: 'default'
        },
        [`:not(.${tabClasses.selected})`]: {
          ':hover': {
            textDecoration: 'underline'
          }
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
  MuiContainer: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...getStyleOverrides(ownerState, 'MuiContainer'),
        padding: 0
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
