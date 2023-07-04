import React from 'react';
import { useNavigate } from 'react-router-dom';
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

import { paths } from '../../app/router';

const Links: React.FC = () => {
  const navigate = useNavigate();

  return (
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
              onClick={() => { navigate(paths.aboutUs._); }}
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
              onClick={() => { navigate(paths.privacyNotice.privacyNotice._); }}
              className='no-decor'
            >
              Privacy Notice
            </Link>
            <Link
              onClick={() => { navigate(paths.termsOfUse.termsOfUse._); }}
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
              onClick={() => { navigate(paths.homeLearning._); }}
              className='no-decor'
            >
              Home learning
            </Link>
            <Link
              onClick={() => { navigate(paths.getInvolved._); }}
              className='no-decor'
            >
              Get involved
            </Link>
            <Link
              onClick={() => { navigate(paths.codingClubs._); }}
              className='no-decor'
            >
              Coding clubs
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Links;
