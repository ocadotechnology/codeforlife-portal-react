import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Link,
  createTheme,
  ThemeProvider,
  useTheme
} from '@mui/material';

const Links: React.FC = () => (
  <ThemeProvider theme={createTheme(useTheme(), {
    components: {
      MuiLink: {
        defaultProps: {
          color: '#fff',
          fontSize: 18
        }
      }
    }
  })}>
    <Grid container spacing={{ xs: 0, sm: 1 }}>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link>
            About us
          </Link>
          <Link>
            Help and support
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link>
            Privacy Notice
          </Link>
          <Link>
            Terms of use
          </Link>
          <Link>
            Cookie settings
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link>
            Home learning
          </Link>
          <Link>
            Get involved
          </Link>
          <Link>
            Coding clubs
          </Link>
        </Stack>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Links;
