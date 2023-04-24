import React from 'react';
import {
  Link,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme
} from '@mui/material';

import { paths } from 'app/router';
import { Image } from 'codeforlife/lib/esm/components';
import PaperPlaneImg from 'images/paper_plane.png';
import BasePage from 'pages/BasePage';
import PageSection from 'components/PageSection';
import { useLocation } from 'react-router-dom';

const EmailVerificationSent: React.FC = () => {
  const location = useLocation();
  const MuiTypographyColor = location.state.isTeacher ? 'white' : 'black';
  const PageBgcolor = location.state.isTeacher ? '#ee0857' : '#ffc709';
  const HomepageLinkColor = location.state.isTeacher ? '#FFFFFF' : '#000000';

  const theme = createTheme(useTheme(), {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: MuiTypographyColor,
            fontSize: '14px'
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BasePage containerProps={{ bgcolor: PageBgcolor }}>
        <PageSection>
          <Stack p={3} display='flex' alignItems='center'>
            <Typography variant='h4' textAlign='center' paddingY={1}>
              We need to verify your email address
            </Typography>
            <Image
              alt={'PaperPlane'}
              src={PaperPlaneImg}
              maxWidth='100px'
            />
            <Typography marginTop={3}>
              An email has been sent to the address you provided.
            </Typography>
            <Typography>
              Please follow the link within the email to verify your details.
            </Typography>
            <Typography>
              If you don&apos;t receive the email within the next few minutes, check your spam folder.
            </Typography>

            <Link
              href={paths.home}
              color={HomepageLinkColor}
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

export default EmailVerificationSent;
