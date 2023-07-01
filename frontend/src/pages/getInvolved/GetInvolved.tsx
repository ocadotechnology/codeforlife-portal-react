import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';

import Page from 'codeforlife/lib/esm/components/page';

import CflCard from '../../components/CflCard';
import GithubImg from '../../images/github.png';
import ClubsImg from '../../images/clubs.png';
import UniversitiesImg from '../../images/universities.png';
import GetInvolvedHero from '../../images/get_involved_hero_cut.png';
import { paths } from '../../app/routes';

const GetInvolved: React.FC = () => {
  return (
    <Page.Container>
      <Page.Banner
        header='Get involved'
        subheader='How you can get involved with the creation of Code for Life products and resources'
        imageProps={{ alt: 'Get involved', src: GetInvolvedHero }}
      />
      <Page.Section>
        <Grid container spacing={4}>
          <Grid xs={12} md={6} lg={4}>
            <CflCard
              text={{
                title: 'Starting a coding club of your own',
                content:
                  'Become a Code for Life ambassador by starting up a coding club. Find out more about how you can get involved with this by visiting our coding club page.'
              }}
              mediaProps={{ title: 'Clubs', image: ClubsImg }}
              buttonProps={{ href: paths.codingClubs._, children: 'Read more', endIcon: <ChevronRightRoundedIcon /> }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <CflCard
              text={{
                title: 'Contribute through code',
                content:
                  'We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects.'
              }}
              mediaProps={{ title: 'Github', image: GithubImg }}
              buttonProps={{ href: paths.contribute._, children: 'Read more', endIcon: <ChevronRightRoundedIcon /> }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <CflCard
              text={{
                title: 'University partnerships',
                content:
                  'Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including coding, user experience, data analytics and new feature design.'
              }}
              mediaProps={{ title: 'Universities', image: UniversitiesImg }}
              buttonProps={{ children: 'Get in touch', endIcon: <ChevronRightRoundedIcon /> }}
            />
          </Grid>
        </Grid>
      </Page.Section>
    </Page.Container>
  );
};

export default GetInvolved;
