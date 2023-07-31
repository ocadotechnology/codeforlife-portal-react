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

import Page from 'codeforlife/lib/esm/components/page';

import { useDownloadStudentPackMutation } from '../../app/api';
import CodeClubHeroImage from '../../images/coding_club_hero_hexagon.jpg';
import AboutUsCFLImage from '../../images/about_us_cfl.jpg';
import PythonClubImage from '../../images/coding_club_python_pack.png';
import Introduction from '../../components/Introduction';

import ClubAim from './ClubAim';

const DownloadButton: React.FC<{
  children: string;
  packId: 3 | 4;
}> = ({ children, packId }) => {
  const [downloadStudentPack] = useDownloadStudentPackMutation();

  return (
    <Button
      style={{ marginTop: 'auto' }}
      endIcon={<DownloadIcon />}
      onClick={() => {
        downloadStudentPack({ id: packId })
          .unwrap()
          .then(({ link }) => { window.open(link, '_blank'); })
          .catch(() => {
            alert('Failed to download pack. Please try again later.');
          });
      }}
    >
      {children}
    </Button>
  );
};

const CodingClubs: React.FC = () => {
  const theme = useTheme();

  return (
    <Page.Container>
      <Page.Banner
        imageProps={{ alt: 'codeClubHero', src: CodeClubHeroImage }}
        header='Coding clubs'
        subheader='A FREE set of slides and guides to run your own coding clubs'
      />
      <Page.Section>
        <ClubAim />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
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
          <DownloadButton packId={3}>
            Download the Primary coding club pack
          </DownloadButton>
        </Introduction>
      </Page.Section>
      <Page.Section>
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
          <DownloadButton packId={4}>
            Download the Python coding club pack
          </DownloadButton>
        </Introduction>
      </Page.Section>
    </Page.Container>
  );
};

export default CodingClubs;
