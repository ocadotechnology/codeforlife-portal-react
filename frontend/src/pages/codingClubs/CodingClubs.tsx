import React from 'react';
import {
  Button,
  Link,
  Typography,
  useTheme
} from '@mui/material';
import {
  Download as DownloadIcon
} from '@mui/icons-material';

import BasePage from '../../pages/BasePage';
import CodeClubHeroImage from '../../images/coding_club_hero_hexagon.jpg';
import AboutUsCFLImage from '../../images/about_us_cfl.jpg';
import PythonClubImage from '../../images/coding_club_python_pack.png';
import PageBanner from '../../components/PageBanner';
import PageSection from '../../components/PageSection';
import Introduction from '../../components/Introduction';

import ClubAim from './ClubAim';

const DownloadButton: React.FC<{
  children: string
}> = ({ children }) => (
  <Button
    style={{ marginTop: 'auto' }}
    endIcon={<DownloadIcon />}
  >
    {children}
  </Button>
);

const CodingClubs: React.FC = () => {
  const theme = useTheme();

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

      <PageSection bgcolor={theme.palette.info.main}>
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
          <DownloadButton>
            Download the Primary coding club pack
          </DownloadButton>
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
          <DownloadButton>
            Download the Python coding club pack
          </DownloadButton>
        </Introduction>
      </PageSection>
    </BasePage >
  );
};

export default CodingClubs;
