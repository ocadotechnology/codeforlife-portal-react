import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  useTheme,
  Link
} from '@mui/material';

import BasePage from 'pages/BasePage';
import PageBanner from 'components/PageBanner';
import AboutUsHeroImage from 'images/about_us_hero_hexagon.png';
import AboutUsCFLImage from 'images/about_us_cfl.jpg';
import AboutUsOcadoImage from 'images/about_us_ocado.jpg';

import Statistics from './Statistics';
import Introduction from './Introduction';
import Quotes from './Quotes';
import Supporters from './Supporters';
import Dedication from './Dedication';

const AboutUs: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <PageBanner
        img={{ alt: 'aboutUsHero', src: AboutUsHeroImage }}
        text={{
          title: 'About Code for Life',
          content: 'Code For Life gives everyone the ability to shape technology\'s future'
        }}
      />
      <Grid xs={12}>
        <Statistics />
      </Grid>
      <Grid xs={12} bgcolor={theme.palette.info.main}>
        <Introduction
          header='What is Code for Life?'
          img={{ alt: 'aboutUsCFL', src: AboutUsCFLImage }}
        >
          <Typography className='normalText'>
            Code for Life(CFL) is a free, easy-to-use resource that provides teaching and lesson plans, user guides and engagement through our two fun coding games: Rapid Router and Kurono. These games are specially designed for people learning computing for the first time.
          </Typography>
          <Typography className='normalText'>
            The aim is to teach new coders the basic principles, to help them thrive in an increasingly digital world. CFL is primarily designed for and tested by primary school teachers. Our games are aligned with the UK&apos;s computing curriculum, so teachers can incorporate CFL into their lessons.
          </Typography>
          <Typography className='normalText'>
            Anyone looking to get into coding can also do so using the games and resources. We opened CFL resources to parents and the general public during the 2020 Covid-19 pandemic so that people don&apos;t need to be part of a school to have access.
          </Typography>
        </Introduction>
      </Grid>
      <Grid xs={12}>
        <Introduction
          header='Who is Ocado Group?'
          img={{ alt: 'aboutUsOcado', src: AboutUsOcadoImage }}
          direction='row-reverse'
        >
          <Typography className='normalText'>
            Ocado Group, the online grocery solutions provider, is powering the future of online retail. Ocado&apos;s tech and solutions are supplied to grocery businesses all around the world. It enables these forward-thinking retailers to do grocery online profitably, sustainably, and in a scalable manner.
          </Typography>
          <Typography className='normalText'>
            Ocado Smart Platform (OSP) is the world&apos;s most advanced end-to-end e-Commerce, fulfilment and logistic platform.
          </Typography>
          <Typography className='normalText'>
            <Link href={process.env.REACT_APP_OCADO_GROUP_HREF} color="inherit" underline="always" target="_blank">Skills for the Future</Link> is one of Ocado Group&apos;s core Corporate Responsibility pillars, which is part of the Ocado Unlimited strategy (alongside Natural Resources and Responsible Sourcing). For Ocado Group, Skills for the Future means championing digital literacy. We want to inspire the next generation of STEM leaders, so that everyone can fully participate in society.
          </Typography>
        </Introduction>
      </Grid>
      <Grid xs={12} bgcolor={theme.palette.info.main}>
        <Quotes />
      </Grid>
      <Grid xs={12}>
        <Supporters />
      </Grid>
      <Grid xs={12} bgcolor={theme.palette.info.main}>
        <Dedication />
      </Grid>
    </BasePage>
  );
};

export default AboutUs;
