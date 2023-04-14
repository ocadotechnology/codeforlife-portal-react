import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';

import BasePage from 'pages/BasePage';
import PageBanner from 'components/PageBanner';
import PageSection from 'components/PageSection';
import CflCard from 'components/CflCard';

import GithubImg from 'images/github.png';
import ClubsImg from 'images/clubs.png';
import UniversitiesImg from 'images/universities.png';
import GetInvolvedHero from 'images/get_involved_hero_cut.png';

const GetInvolved: React.FC = () => {
  return (
    <BasePage>
      <PageBanner
        text={{
          title: 'Get involved',
          content:
            'How you can get involved with the creation of Code for Life products and resources'
        }}
        img={{ alt: 'Get involved', src: GetInvolvedHero }}
      />
      <PageSection>
        <Grid container spacing={4}>
          <Grid xs={12} md={6} lg={4}>
            <CflCard
              text={{
                title: 'Starting a coding club of your own',
                content:
                  'Become a Code for Life ambassador by starting up a coding club. Find out more about how you can get involved with this by visiting our coding club page.'
              }}
              img={{ alt: 'Clubs', src: ClubsImg }}
              btn={{ btnText: 'Read more', endIcon: <ChevronRightRoundedIcon /> }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <CflCard
              text={{
                title: 'Contribute through code',
                content:
                  'We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects.'
              }}
              img={{ alt: 'Github', src: GithubImg }}
              btn={{ btnText: 'Read more', endIcon: <ChevronRightRoundedIcon /> }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <CflCard
              text={{
                title: 'University partnerships',
                content:
                  'Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including coding, user experience, data analytics and new feature design.'
              }}
              img={{ alt: 'Universities', src: UniversitiesImg }}
              btn={{ btnText: 'Get in touch', endIcon: <ChevronRightRoundedIcon /> }}
            />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default GetInvolved;
