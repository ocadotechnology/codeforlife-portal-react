import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Link,
  createTheme,
  ThemeProvider,
  useTheme
} from '@mui/material';

import { paths } from '../../app/router';
import { OpenContactUsWidget, ShowCookiesDrawer } from '../thirdParty';

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
          <Link href={paths.aboutUs}>
            About us
          </Link>
          <Link onClick={OpenContactUsWidget}>
            Help and support
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link href={paths.privacyNotice._}>
            Privacy Notice
          </Link>
          <Link href={paths.termsOfUse}>
            Terms of use
          </Link>
          <Link onClick={ShowCookiesDrawer}>
            Cookie settings
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack>
          <Link href={paths.homeLearning}>
            Home learning
          </Link>
          <Link href={paths.getInvolved}>
            Get involved
          </Link>
          <Link href={paths.codingClubs}>
            Coding clubs
          </Link>
        </Stack>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Links;
