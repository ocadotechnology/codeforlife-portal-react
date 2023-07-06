import React from 'react';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import RapidRouterImage from '../../images/rapid_router.png';
import GitbookImage from '../../images/gitbook.png';
import GithubHexagon from '../../images/github_hexagon.png';
import { Image } from 'codeforlife/lib/esm/components';

const Contribute: React.FC = () => {
  const theme = useTheme();

  return (
    <Page.Container>
      <Page.Banner
        imageProps={{ alt: 'GitHub', title: 'GitHub', src: GithubHexagon }}
        header='Contribute to Code for Life'
        subheader='How you can get involved with Code for Life products and resources and help us help others'
      />

      <Page.Section>
        <Typography align='center' variant='h4'>How to get involved and gain experience</Typography>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <Typography>Code for Life would not have been possible without the dedication of our volunteers.</Typography>
            <Typography>In 2014, computing was added to the UK curriculum, requiring schools to teach coding principles
              and programming foundations.</Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography>Recognising a need to support teachers and students in navigating the uncharted territory, Ocado
              Technology deployed an army of internal volunteers who worked after hours, fuelled by free pizzas and
              fizzy drinks.</Typography>
            <Typography>What came out of this, is what you see today, used by educators and learners from over 150
              countries. Our products are open-source and free forever.</Typography>
          </Grid>
        </Grid>
        <Stack alignItems='end'>
          <Button
            href='https://docs.codeforlife.education/'
            target='_blank'
            endIcon={<ChevronRightIcon />}
          >
            Read our developer guide
          </Button>
        </Stack>
      </Page.Section>

      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <Typography variant='h4'>
              Our products
            </Typography>
            <Typography fontWeight='bold'>
              The portal or website
            </Typography>
            <Typography>
              This is the gateway for users to get to know who we are and what we do. It hosts our web-based
              games and plenty of teaching resources.
            </Typography>
            <Typography fontWeight='bold'>
              Rapid Router
            </Typography>
            <Typography>
              An introduction to coding that is aimed at Key Stages 1-3 (age 5 to 14). Built on Blockly, it&apos;s
              a visual programming language similar to Scratch. The levels start off with Blockly and gradually progress
              to Python. With 109 levels, Rapid Router is our flagship game with the biggest user base.</Typography>
            <Typography fontWeight='bold'>
              Kurono
            </Typography>
            <Typography mb={0}>
              A multiplayer game that is aimed at older students of Key Stages 3 and up, it is primarily for
              use in a class or a club setting. Students code in Python to move their avatar around in order to complete
              tasks. Parts of Kurono are still in development.
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Image
              alt={'Rapid Router'}
              src={RapidRouterImage}
            />
          </Grid>
        </Grid>
      </Page.Section>

      <Page.Section>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <Image
              alt={'Gitbook'}
              src={GitbookImage}
              border='1px solid black'
            />
          </Grid>
          <Grid item sm={6}>
            <Typography variant='h4'>
              How you can contribute
            </Typography>
            <Typography>
              Today, there is a small dedicated team working full time on Code for Life. This year, we&apos;re
              expecting to reach over 100,000 newly registered teachers and students. We need your help to do even more.
            </Typography>
            <Typography>
              If contributing to open-source projects to support education in coding and technology sounds
              exciting for you, we&apos;d love to have you on board!
            </Typography>
            <Stack alignItems='end'>
              <Button
                href='https://docs.codeforlife.education/'
                target='_blank'
                endIcon={<ChevronRightIcon />}
              >
                Read our developer guide
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Page.Section>
    </Page.Container>
  );
};

export default Contribute;
