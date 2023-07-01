import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Link,
  createTheme,
  ThemeProvider,
  useTheme
} from '@mui/material';

import {
  useFreshworksWidget,
  useOneTrustInfoToggle
} from 'codeforlife/lib/esm/hooks';

import { paths } from '../../app/routes';

const Links: React.FC = () => (
  <ThemeProvider theme={createTheme(useTheme(), {
    components: {
      MuiLink: {
        defaultProps: {
          color: '#fff'
        }
      }
    }
  })}>
    <Grid container spacing={{ xs: 0, sm: 1 }}>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link
            href={paths.aboutUs._}
            className='no-decor'
          >
            About us
          </Link>
          <Link
            onClick={() => { useFreshworksWidget('open'); }}
            className='no-decor'
          >
            Help and support
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link
            href={paths.privacyNotice.privacyNotice._}
            className='no-decor'
          >
            Privacy Notice
          </Link>
          <Link
            href={paths.termsOfUse.termsOfUse._}
            className='no-decor'
          >
            Terms of use
          </Link>
          <Link
            onClick={useOneTrustInfoToggle}
            className='no-decor'
          >
            Cookie settings
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link
            href={paths.homeLearning._}
            className='no-decor'
          >
            Home learning
          </Link>
          <Link
            href={paths.getInvolved._}
            className='no-decor'
          >
            Get involved
          </Link>
          <Link
            href={paths.codingClubs._}
            className='no-decor'
          >
            Coding clubs
          </Link>
        </Stack>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Links;
