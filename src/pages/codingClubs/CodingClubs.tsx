import React from 'react';
import {
  Button,
  Link,
  Typography,
  useTheme
} from '@mui/material';

import BasePage from 'pages/BasePage';

import CodeClubHeroImage from 'images/coding_club_hero_hexagon.jpg';
import AboutUsCFLImage from 'images/about_us_cfl.jpg';
import PythonClubImage from 'images/coding_club_python_pack.png';
import PageBanner from 'components/PageBanner';
import PageSection from 'components/PageSection';
import Introduction from 'components/Introduction';
import ClubAim from './ClubAim';

const CodingClubs: React.FC = () => {
  const theme = useTheme();
  const downloadSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12h2v5h16v-5h2v5c0 1.11-.89 2-2 2H4a2 2 0 0 1-2-2v-5m10 3l5.55-5.46l-1.42-1.41L13 11.25V2h-2v9.25L7.88 8.13L6.46 9.55L12 15Z" /></svg>;

  return (
    <BasePage>
      <PageBanner
        img={{ alt: 'codeClubHero', src: CodeClubHeroImage }}
        text={{
          title: 'Coding clubs',
          content: 'A FREE set of slides and guides to run your own coding clubs'
        }}
      />

      <PageSection>
        <ClubAim />
      </PageSection>

      <PageSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <Introduction
          header='Primary coding club'
          img={{ alt: 'aboutUsCFL', src: AboutUsCFLImage }}
        >
          <Typography>
            Download your FREE coding club pack for students aged 7-11. This pack introduces students to the first principles of Python at a faster pace than the regular lesson plans. It is aimed at students already interested in learning coding and can be used in clubs, at home or in school, on or offline.
          </Typography>
          <Typography>
            View the resources <Link href={process.env.REACT_APP_PRIMARY_RESOURCE_HREF} color="inherit" underline="always" target="_blank">online here</Link>.
          </Typography>
          <Button sx={{ width: 'fit-content', marginTop: 'auto' }} >
            Download the Primary coding club pack
            &nbsp;{downloadSvg}
          </Button>
        </Introduction>
      </PageSection>

      <PageSection>
        <Introduction
          header='Python coding club'
          img={{ alt: 'pythonCodingClub', src: PythonClubImage }}
          direction='row-reverse'
        >
          <Typography>
            Download your FREE coding club pack for students aged 12 and above. This pack is a fast paced introduction to Python. It is aimed at students already interested in learning coding, individuals looking to learn and run their own club, or adults wanting to try coding out. It is designed to be used in face-to-face or online clubs.
          </Typography>
          <Typography>
            View the resources <Link href={process.env.REACT_APP_PYTHON_RESOURCE_HREF} color="inherit" underline="always" target="_blank">online here</Link>.
          </Typography>
          <Button sx={{ width: 'fit-content', marginTop: 'auto' }} >
            Download the Python coding club pack
            &nbsp;{downloadSvg}
          </Button>
        </Introduction>
      </PageSection>
    </BasePage >
  );
};

export default CodingClubs;
