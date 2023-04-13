import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';

import { ImageProps } from 'codeforlife/lib/esm/components';

import BasePage from 'pages/BasePage';
import PageBanner from 'components/PageBanner';
import PageSection from 'components/PageSection';

import GithubImg from 'images/github.png';
import ClubsImg from 'images/clubs.png';
import UniversitiesImg from 'images/universities.png';
import GetInvolvedHero from 'images/get_involved_hero_cut.png';

const ReadMoreCard: React.FC<{
  text: { title: string; content: string };
  img: ImageProps;
}> = ({ text, img }) => {
  return (
    <Grid xs={12} md={6} lg={4}>
      <Card
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <CardMedia
          component="img"
          height={242}
          image={img.src}
          title={img.alt}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{text.title}</Typography>
          <Typography>{text.content}</Typography>
        </CardContent>
        <CardActions>
          <Button endIcon={<ChevronRightRoundedIcon />}>Read more</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

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
          <ReadMoreCard
            text={{
              title: 'Starting a coding club of your own',
              content:
                'Become a Code for Life ambassador by starting up a coding club. Find out more about how you can get involved with this by visiting our coding club page.'
            }}
            img={{ alt: 'Clubs', src: ClubsImg }}
          />
          <ReadMoreCard
            text={{
              title: 'Contribute through code',
              content:
                'We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects.'
            }}
            img={{ alt: 'Github', src: GithubImg }}
          />
          <ReadMoreCard
            text={{
              title: 'University partnerships',
              content:
                'Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including coding, user experience, data analytics and new feature design.'
            }}
            img={{ alt: 'Universities', src: UniversitiesImg }}
          />
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default GetInvolved;
