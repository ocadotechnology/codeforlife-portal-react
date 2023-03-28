import React from 'react';
import {
  Button,
  Link,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import BasePage from 'pages/BasePage';

import { Image } from 'codeforlife/lib/esm/components';
// import CodeClubHeroImage from 'images/coding_club_hero_hexagon.jpg';
import AboutUsCFLImage from 'images/about_us_cfl.jpg';
import PythonClubImage from 'images/coding_club_python_pack.png';
import { BaseSection } from 'components/BaseSection';
// import { PageBanner } from 'pages/aboutUs/PageBanner';

const CodingClubs: React.FC = () => {
  const theme = useTheme();
  const primaryResourceLink = 'https://code-for-life.gitbook.io/code-club-resources/';
  const pythonResourceLink = 'https://code-for-life.gitbook.io/code-club-resources-intermediate/';

  return (
    <BasePage>
      <BaseSection containerProps={{ bgcolor: theme.palette.primary.main }}>
        {/* <PageBanner img={{ alt: 'codeClubHero', src: CodeClubHeroImage }} title='Coding clubs' description='A FREE set of slides and guides to run your own coding clubs' /> */}
      </BaseSection>

      <BaseSection>
        <Grid xs>
          <Stack>
            <Typography variant='h4' textAlign='center' my={5}>
              Who are the club packs aimed at?
            </Typography>
            <Typography fontSize={18}>
              The FREE resource packs are aimed at two different groups, the first is aimed at students ages between 7-11yrs with an interest in learning Python. The second pack is aimed at students 12yrs and up, including adults. This moves at a much faster pace and also introduces students to setting up an environment on their own computer.
            </Typography>
            <Typography fontSize={18} mt={3} mb={5}>
              Both packs are a condensed learning pathway using our game Rapid Router alongside suggested session plan and slides.
            </Typography>
          </Stack>
        </Grid>
      </BaseSection>

      <BaseSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <Grid container xs={6} pr={1} direction='column'>
          <Grid xs>
            <Typography variant='h5' mb={3}>
              Primary coding club
            </Typography>
            <Typography fontSize={18} mb={3}>
              Download your FREE coding club pack for students aged 7-11. This pack introduces students to the first principles of Python at a faster pace than the regular lesson plans. It is aimed at students already interested in learning coding and can be used in clubs, at home or in school, on or offline.
            </Typography>
            <Typography fontSize={18}>
              View the resources <Link href={primaryResourceLink} color="inherit" underline="always">online here</Link>.
            </Typography>
          </Grid>
          <Grid xs display='flex' alignItems='flex-end' >
            <Button>
              Download the Primary coding club pack
              &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12h2v5h16v-5h2v5c0 1.11-.89 2-2 2H4a2 2 0 0 1-2-2v-5m10 3l5.55-5.46l-1.42-1.41L13 11.25V2h-2v9.25L7.88 8.13L6.46 9.55L12 15Z" /></svg>
            </Button>
          </Grid>
        </Grid>
        <Grid xs={6} display='flex' alignItems='center'>
          <Image alt={'aboutUsCFL'} src={AboutUsCFLImage} />
        </Grid>
      </BaseSection>

      <BaseSection>
        <Grid xs={6} display='flex' alignItems='center'>
          <Image alt={'pythonCodingClub'} src={PythonClubImage} />
        </Grid>
        <Grid container xs={6} pr={1} direction='column'>
          <Grid xs>
            <Typography variant='h5' mb={3}>
              Python coding club
            </Typography>
            <Typography fontSize={18} mb={3}>
              Download your FREE coding club pack for students aged 12 and above. This pack is a fast paced introduction to Python. It is aimed at students already interested in learning coding, individuals looking to learn and run their own club, or adults wanting to try coding out. It is designed to be used in face-to-face or online clubs.
            </Typography>
            <Typography fontSize={18}>
              View the resources <Link href={pythonResourceLink} color="inherit" underline="always">online here</Link>.
            </Typography>
          </Grid>
          <Grid xs display='flex' alignItems='flex-end' >
            <Button>
              Download the Python coding club pack
              &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12h2v5h16v-5h2v5c0 1.11-.89 2-2 2H4a2 2 0 0 1-2-2v-5m10 3l5.55-5.46l-1.42-1.41L13 11.25V2h-2v9.25L7.88 8.13L6.46 9.55L12 15Z" /></svg>
            </Button>
          </Grid>
        </Grid>
      </BaseSection>

    </BasePage>
  );
};

export default CodingClubs;
