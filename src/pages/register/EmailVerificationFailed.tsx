import React from 'react';
import {
  Link,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';
import { paths } from 'app/router';
import BasePage from 'pages/BasePage';
import PageSection from 'components/PageSection';
import SadFaceImg from 'images/sadface.png';

const EmailVerificationFailed: React.FC = () => {
  const theme = createTheme(useTheme(), {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
            fontSize: '14px'
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BasePage containerProps={{ bgcolor: '#ee0857' }}>
        <PageSection>
          <Stack p={3} display='flex' alignItems='center'>
            <Typography variant='h4' textAlign='center' paddingY={1}>
              Your email address verification failed
            </Typography>
            <Image
              alt={'SadFace'}
              src={SadFaceImg}
              maxWidth='100px'
            />
            <Typography marginTop={3}>
              You used an invalid link, either you mistyped the URL or that link is expired.
            </Typography>
            <Typography>
              When you next attempt to log in, you will be sent a new verification email.
            </Typography>

            <Link
              href={paths.home}
              color={'#FFFFFF'}
              underline='always'
              fontSize={18}
            >
              Back to homepage
            </Link>
          </Stack>
        </PageSection>
      </BasePage>
    </ThemeProvider>
  );
};

export default EmailVerificationFailed;
