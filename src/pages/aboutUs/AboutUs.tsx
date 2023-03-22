import React from 'react';
import {
  GridDirection,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import BasePage from 'pages/BasePage';

import { Image } from 'codeforlife/lib/esm/components';
import AboutUsHero from 'images/about_us_hero_hexagon.png';
import AboutUsCFL from 'images/about_us_cfl.jpg';
import AboutUsOcado from 'images/about_us_ocado.jpg';
import Logo10xImage from 'images/10x_logo.png';
import BcsImage from 'images/bcs_logo.png';
import IclImage from 'images/icl_logo.png';
import BarefootImage from 'images/barefoot_logo.png';
import MCSaatchiImage from 'images/mc_saatchi_logo.png';
import HOPEImage from 'images/hope_logo.png';
import GLAImage from 'images/gla_logo.png';
import PressureCookerImage from 'images/pressure_cooker_logo.png';
import SharonHarrisonImage from 'images/sharon_harrison.jpg';
import { ResponsiveStyleValue } from '@mui/system';

const Record: React.FC<{
  number: string
  description: string
}> = ({ number, description }) => (
  <Grid m={3}>
    <Stack maxWidth='310px' alignItems='center'>
      <Typography variant='h3' style={{ color: '#00a3e0' }} mb={3}>
        {number}
      </Typography>
      <Typography fontSize={18} textAlign='center'>
        {description}
      </Typography>
    </Stack>
  </Grid>
);

const Intro: React.FC<{
  img: { alt: string, src: string }
  title: string
  description: string[]
  direction: ResponsiveStyleValue<GridDirection>
}> = ({ img, title, description, direction }) => (
  <Grid container direction={direction} spacing={1}>
    <Grid xs={2} />
    <Grid xs={4} my={3} px={2}>
      <Typography variant='h5'>
        {title}
      </Typography>
      {description.map(d =>
        <Typography fontSize={18} my={2}>
          {d}
        </Typography>
      )}
    </Grid>
    <Grid xs={4} px={2} display='flex' alignItems='center'>
      <Image alt={img.alt} src={img.src} boxProps={{ maxWidth: '555px' }} />
    </Grid>
    <Grid xs={2} />
  </Grid>
);

const AboutUs: React.FC = () => {
  const theme = useTheme();
  const logoBoxProps = { maxWidth: '100px' };
  const quoteStyle = { color: '#e0004d', fontSize: 22, fontFamily: 'SpaceGrotesk', fontWeight: '500', lineHeight: '1.8rem' };
  const normalTextStyle = { fontSize: 18 };
  const cflDescription = [
    'Code for Life(CFL) is a free, easy - to - use resource that provides teaching and lesson plans, user guides and engagement through our two fun coding games: Rapid Router and Kurono.These games are specially designed for people learning computing for the first time.',
    'The aim is to teach new coders the basic principles, to help them thrive in an increasingly digital world. CFL is primarily designed for and tested by primary school teachers. Our games are aligned with the UK\'s computing curriculum, so teachers can incorporate CFL into their lessons.',
    'Anyone looking to get into coding can also do so using the games and resources. We opened CFL resources to parents and the general public during the 2020 Covid-19 pandemic so that people don\'t need to be part of a school to have access.',
  ];
  const ocadoDescription = [
    'Ocado Group, the online grocery solutions provider, is powering the future of online retail. Ocado\'s tech and solutions are supplied to grocery businesses all around the world. It enables these forward-thinking retailers to do grocery online profitably, sustainably, and in a scalable manner.',
    'Ocado Smart Platform (OSP) is the world\'s most advanced end-to-end e-Commerce, fulfilment and logistic platform.',
    'Skills for the Future is one of Ocado Group\'s core Corporate Responsibility pillars, which is part of the Ocado Unlimited strategy (alongside Natural Resources and Responsible Sourcing). For Ocado Group, Skills for the Future means championing digital literacy. We want to inspire the next generation of STEM leaders, so that everyone can fully participate in society.',
  ];
  // TODO: hover & hyperlink

  return (
    <BasePage>
      <Grid container xs={12} bgcolor={theme.palette.primary.main} className='flex-center'>
        <Grid xs={2} />
        <Grid xs={5} px={5} pb={5}>
          <Typography variant='h2' style={{ color: 'white' }} mb={2}>
            About Code for Life
          </Typography>
          <Typography variant='h5' style={{ color: 'white' }}>
            Code For Life gives everyone the ability to shape technology's future
          </Typography>
        </Grid>
        <Grid xs={3} p={0}>
          <Image alt={'aboutUsHero'} src={AboutUsHero} boxProps={{ maxWidth: '370px' }} />
        </Grid>
        <Grid xs={2} />
      </Grid>

      <Grid xs={12} container>
        <Grid xs={3} />
        <Grid xs className='flex-center' textAlign='center' mt={5}>
          <Typography variant='h5'>
            Code For Life is a non profit initiative that delivers free, open-source games that help all students learn computing.
          </Typography>
        </Grid>
        <Grid xs={3} />
      </Grid>
      <Grid container xs={12} display='flex' justifyContent='center' mb={3}>
        <Record number='2014' description='The year that computing was added to the UK curriculum. We&apos;ve been supporting teachers and students ever since.' />
        <Record number='>160' description='Countries are taking part, with the UK, the USA, Brazil, Australia and Canada as top locations for schools signed up to CFL. Nearly 10,000 schools are registered globally.' />
        <Record number='>270,000' description='Active users so far, with numbers growing every day. In 2020 alone, close to 100,000 new people subscribed to our resources.' />
      </Grid>

      <Grid bgcolor={theme.palette.info.main}>
        <Intro img={{ alt: 'aboutUsCFL', src: AboutUsCFL }} title='What is Code for Life?' description={cflDescription} direction='row' />
      </Grid>

      <Grid>
        <Intro img={{ alt: 'aboutUsOcado', src: AboutUsOcado }} title='Who is Ocado Group?' description={ocadoDescription} direction='row-reverse' />
      </Grid>

      <Grid bgcolor={theme.palette.info.main}>
        <Typography variant='h4' textAlign='center' mt={5} mb={3}>
          Code for Life and Ocado Group
        </Typography>
        <Grid container>
          <Grid xs={2} />
          <Grid xs mx={4}>
            <Typography style={quoteStyle}>
              “We were delighted computing entered the UK curriculum in 2014. However, many teachers felt unprepared. And the lack of diversity in people studying STEM concerned us. So, we sought to make the subject appeal to a broader group of both students and teachers.”
            </Typography>
            <Typography style={normalTextStyle} mt={3}>
              Anne Marie Neatham, Commercial Director and COO Kindred, Ocado Group.
            </Typography>
          </Grid>
          <Grid xs mx={4}>
            <Typography style={normalTextStyle} mb={3}>
              With that in mind, CFL was developed by volunteers and interns from Ocado Technology - the technology arm of Ocado Group - and teacher Sharon Harrison, who created the Rapid Router learning materials. Anne Marie continues:
            </Typography>
            <Typography style={quoteStyle}>
              “I'm proud this initiative has been breaking down stereotypes. Children are seeing that you don't have to fit a certain gender, race or personality type to get coding.”
            </Typography>
            <Typography style={normalTextStyle} my={5}>
              Today, CFL is operated by a small core team and volunteers.
            </Typography>
          </Grid>
          <Grid xs={2} />
        </Grid>
      </Grid>

      <Grid >
        <Typography variant='h4' textAlign='center' mt={5} mb={3}>
          We couldn't do it without you!
        </Typography>
        <Grid container>
          <Grid xs={2} />
          <Grid xs mx={4}>
            <Typography variant='h5' my={3}>
              Our team and volunteers
            </Typography>
            <Typography style={normalTextStyle}>
              Code for Life would not have been possible without the time and skills volunteered by our talented developers and creatives at Ocado Technology. Thank you to everyone who has helped us get to where we are now.
            </Typography>
            <Typography variant='h5' my={3}>
              Want to get involved?
            </Typography>
            <Typography style={normalTextStyle}>
              We are open source, so anyone can ask to contribute. You can play with game-running JavaScript, Python/Django, animation using SVG and Raphael, and a lot more. We'd like input from all sorts of backgrounds, whether you're: a programmer looking for a creative outlet; a teacher hoping to shape the resources; or even a pupil putting your skills to the test.
            </Typography>
          </Grid>
          <Grid xs mx={4}>
            <Typography variant='h5' my={3}>
              Developers
            </Typography>
            <Typography style={normalTextStyle}>
              To contribute, head over to GitHub, check out the issue tracker, and get started. There you can suggest new features or assign yourself an issue to develop. You can find more info about how to do all these on our docs on Gitbook.
            </Typography>
            <Typography variant='h5' my={3}>
              Teachers, parents, and creatives
            </Typography>
            <Typography style={normalTextStyle}>
              Please get in touch through our contact form and let us know how you would like to get involved.
            </Typography>
            <Typography style={normalTextStyle}>
              We would like to thank our friends who have contributed to this initiative.
            </Typography>
          </Grid>
          <Grid xs={2} />
        </Grid>
      </Grid>

      <Grid xs={12} mt={6}>
        <Typography variant='h6' textAlign='center'>
          We would like to thank our friends who have contributed to this initiative
        </Typography>
      </Grid>
      <Grid xs={12} m={1} display='flex' justifyContent='center' alignItems='baseline'>
        <Image alt={'10x'} src={Logo10xImage} boxProps={logoBoxProps} />
        <Image alt={'bcs'} src={BcsImage} boxProps={logoBoxProps} />
        <Image alt={'icl'} src={IclImage} boxProps={logoBoxProps} />
        <Image alt={'barefoot'} src={BarefootImage} boxProps={logoBoxProps} />
        <Image alt={'mcSaatch'} src={MCSaatchiImage} boxProps={logoBoxProps} />
        <Image alt={'hope'} src={HOPEImage} boxProps={logoBoxProps} />
        <Image alt={'gla'} src={GLAImage} boxProps={logoBoxProps} />
        <Image alt={'pressureCooker'} src={PressureCookerImage} boxProps={logoBoxProps} />
      </Grid>
      <Grid>
        <Typography fontSize={14} textAlign='center' mx={50} mb={8} lineHeight='1.6rem'>
          10X, BCS Academy of Computing, Barefoot Computing, Computing at School, The National Museum of
          Computing, Imperial College London, M&C Saatchi, Alvaro Ramirez, Jason Fingland, Ramneet Loyall, Sharon
          Harrison, Keith Avery, Dale Coan, Rob Whitehouse, Mandy Nash, Tanya Nothard, Matt Trevor, Moy El-Bushra,
          Richard Siwiak, Peter Tondrow, Liz Pratt, Pressure Cooker Studios, GAL Education, Hope Education.
        </Typography>
      </Grid>

      <Grid xs bgcolor={theme.palette.info.main}>
        <Grid container className='flex-center' direction='column' >
          <Typography variant='h4' textAlign='center' mt={5}>
            Dedicated to Sharon Harrison
          </Typography>
          <Image alt={'SharonHarrison'} src={SharonHarrisonImage} boxProps={{ maxWidth: '150px', margin: 3 }} />
          <Typography variant='h5' textAlign='center'>
            1956 — 2015
          </Typography>
        </Grid>
        <Grid container mx={45} >
          <Typography fontSize={18} fontWeight='bold' my={3}>
            Sharon was instrumental in helping to create Code for Life. At the beginning of 2014 she was recruited to act as our Educational Consultant. The project drew on her previous skills as a pioneering computing teacher and education consultant.
          </Typography>
          <Typography fontSize={18} mb={5}>
            Sharon has left a lasting legacy by creating something which will help teach STEM skills to the next generation of computer scientists across the world.
          </Typography>
        </Grid>
      </Grid>
    </BasePage >
  );
};

export default AboutUs;
