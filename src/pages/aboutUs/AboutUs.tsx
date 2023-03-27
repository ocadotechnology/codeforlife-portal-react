import React from 'react';
import {
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useTheme,
  Link,
  Grid2Props
} from '@mui/material';

import BasePage from 'pages/BasePage';

import { Image } from 'codeforlife/lib/esm/components';
import AboutUsHeroImage from 'images/about_us_hero_hexagon.png';
import AboutUsCFLImage from 'images/about_us_cfl.jpg';
import AboutUsOcadoImage from 'images/about_us_ocado.jpg';
import Logo10xImage from 'images/10x_logo.png';
import BcsImage from 'images/bcs_logo.png';
import IclImage from 'images/icl_logo.png';
import BarefootImage from 'images/barefoot_logo.png';
import MCSaatchiImage from 'images/mc_saatchi_logo.png';
import HOPEImage from 'images/hope_logo.png';
import GLAImage from 'images/gla_logo.png';
import PressureCookerImage from 'images/pressure_cooker_logo.png';
import SharonHarrisonImage from 'images/sharon_harrison.jpg';

type GridElement = React.ReactElement<typeof Grid>;
export const BaseSection: React.FC<{
  children: GridElement | GridElement[],
  containerProps?: Grid2Props
}> = ({ children, containerProps = {} }) => {
  return (
    <Grid container xs={12} p={0} spacing={0} {...containerProps}>
      <Grid xs={2} />
      <Grid xs>
        {children}
      </Grid>
      <Grid xs={2} />
    </Grid>
  );
};

export const PageBanner: React.FC<{
  img: { alt: string, src: string }
  title: string
  description: string
}> = ({ img, title, description }) => (
  <Grid xs={12} display='flex'>
    <Grid xs={8} pr={6} mr={6}>
      <Typography variant='h2' style={{ color: 'white' }} pt={6}>
        {title}
      </Typography>
      <Typography variant='h4' style={{ color: 'white' }} pt={3} pb={2}>
        {description}
      </Typography>
    </Grid>
    <Grid xs={4} p={0}>
      <Image alt={img.alt} src={img.src} boxProps={{ maxWidth: '370px' }} />
    </Grid>
  </Grid>
);

export const TwoColumnSection: React.FC<{
  left: GridElement | GridElement[],
  right: GridElement | GridElement[]
}> = ({ left, right }) => (
  <Grid container xs={12} mt={2} mb={5} spacing={5}>
    {left}
    {right}
  </Grid>
);

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

const AboutUs: React.FC = () => {
  const theme = useTheme();
  const quoteStyle = { color: '#e0004d', fontSize: 22, fontFamily: 'SpaceGrotesk', fontWeight: '500', lineHeight: '1.8rem' };
  const logoBoxProps = { sx: { mx: 0.5 } };

  const cflIntroLeftChild = <>
    <Grid xs={6} pr={1}>
      <Typography variant='h5' className='headerText'>
        What is Code for Life?
      </Typography>
      <Typography className='normalText'>
        Code for Life(CFL) is a free, easy-to-use resource that provides teaching and lesson plans, user guides and engagement through our two fun coding games: Rapid Router and Kurono. These games are specially designed for people learning computing for the first time.
      </Typography>
      <Typography className='normalText'>
        The aim is to teach new coders the basic principles, to help them thrive in an increasingly digital world. CFL is primarily designed for and tested by primary school teachers. Our games are aligned with the UK&apos;s computing curriculum, so teachers can incorporate CFL into their lessons.
      </Typography>
      <Typography className='normalText'>
        Anyone looking to get into coding can also do so using the games and resources. We opened CFL resources to parents and the general public during the 2020 Covid-19 pandemic so that people don&apos;t need to be part of a school to have access.
      </Typography>
    </Grid>
  </>;

  const cflIntroRightChild = <>
    <Grid xs={6} display='flex' alignItems='center'>
      <Image alt={'aboutUsCFL'} src={AboutUsCFLImage} />
    </Grid>
  </>;

  const ocadoIntroLeftChild = <>
    <Grid xs={6} display='flex' alignItems='center'>
      <Image alt={'aboutUsOcado'} src={AboutUsOcadoImage} />
    </Grid>
  </>;

  const ocadoIntroRightChild = <>
    <Grid xs={6} pr={1}>
      <Typography variant='h5' className='headerText'>
        Who is Ocado Group?
      </Typography>
      <Typography className='normalText'>
        Ocado Group, the online grocery solutions provider, is powering the future of online retail. Ocado&apos;s tech and solutions are supplied to grocery businesses all around the world. It enables these forward-thinking retailers to do grocery online profitably, sustainably, and in a scalable manner.
      </Typography>
      <Typography className='normalText'>
        Ocado Smart Platform (OSP) is the world&apos;s most advanced end-to-end e-Commerce, fulfilment and logistic platform.
      </Typography>
      <Typography className='normalText'>
        <Link href={process.env.REACT_APP_OCADO_GROUP_HREF} color="inherit" underline="always" target="_blank">Skills for the Future</Link> is one of Ocado Group&apos;s core Corporate Responsibility pillars, which is part of the Ocado Unlimited strategy (alongside Natural Resources and Responsible Sourcing). For Ocado Group, Skills for the Future means championing digital literacy. We want to inspire the next generation of STEM leaders, so that everyone can fully participate in society.
      </Typography>
    </Grid>
  </>;

  const cflAndOcadoLeftChild = <>
    <Grid xs mx={4}>
      <Typography style={quoteStyle}>
        “We were delighted computing entered the UK curriculum in 2014. However, many teachers felt unprepared. And the lack of diversity in people studying STEM concerned us. So, we sought to make the subject appeal to a broader group of both students and teachers.”
      </Typography>
      <Typography className='normalText'>
        Anne Marie Neatham, Commercial Director and COO Kindred, Ocado Group.
      </Typography>
    </Grid>
  </>;

  const cflAndOcadoRightChild = <>
    <Grid xs mx={4}>
      <Typography fontSize={18} mb={2}>
        With that in mind, CFL was developed by volunteers and interns from Ocado Technology - the technology arm of Ocado Group - and teacher Sharon Harrison, who created the Rapid Router learning materials. Anne Marie continues:
      </Typography>
      <Typography style={quoteStyle}>
        “I&apos;m proud this initiative has been breaking down stereotypes. Children are seeing that you don&apos;t have to fit a certain gender, race or personality type to get coding.”
      </Typography>
      <Typography className='normalText'>
        Today, CFL is operated by a small core team and volunteers.
      </Typography>
    </Grid>
  </>;

  const participantsLeftChild = <>
    <Grid xs mx={4}>
      <Typography variant='h5' className='headerText'>
        Our team and volunteers
      </Typography>
      <Typography className='normalText'>
        Code for Life would not have been possible without the time and skills volunteered by our talented developers and creatives at Ocado Technology. Thank you to everyone who has helped us get to where we are now.
      </Typography>
      <Typography variant='h5' my={3}>
        Want to get involved?
      </Typography>
      <Typography className='normalText'>
        We are open source, so anyone can ask to contribute. You can play with game-running JavaScript, Python/Django, animation using SVG and Raphael, and a lot more. We&apos;d like input from all sorts of backgrounds, whether you&apos;re: a programmer looking for a creative outlet; a teacher hoping to shape the resources; or even a pupil putting your skills to the test.
      </Typography>
    </Grid>
  </>;

  const participantsRightChild = <>
    <Grid xs mx={4}>
      <Typography variant='h5' className='headerText'>
        Developers
      </Typography>
      <Typography className='normalText'>
        To contribute, head over to <Link href={process.env.REACT_APP_PORTAL_GITHUB_HREF} color="inherit" underline="always" target="_blank">GitHub</Link>, check out the issue tracker, and get started. There you can suggest new features or assign yourself an issue to develop. You can find more info about how to do all these on our <Link href={process.env.REACT_APP_CFL_DOCS_HREF} color="inherit" underline="always" target="_blank">docs on Gitbook</Link>.
      </Typography>
      <Typography variant='h5' className='headerText'>
        Teachers, parents, and creatives
      </Typography>
      <Typography className='normalText'>
        Please get in touch through our <Link color="inherit" underline="always">contact</Link> form and let us know how you would like to get involved.
      </Typography>
      <Typography className='normalText'>
        We would like to thank our friends who have contributed to this initiative.
      </Typography>
    </Grid>
  </>;

  return (
    <BasePage>
      <BaseSection containerProps={{ bgcolor: theme.palette.primary.main }}>
        <PageBanner img={{ alt: 'aboutUsHero', src: AboutUsHeroImage }} title='About Code for Life' description='Code For Life gives everyone the ability to shape technology&apos;s future' />
      </BaseSection>

      <BaseSection>
        <Grid xs display='flex' textAlign='center' px={6} mt={5}>
          <Typography variant='h5'>
            Code For Life is a non profit initiative that delivers free, open-source games that help all students learn computing.
          </Typography>
        </Grid>
        <Grid container xs={12} display='flex' justifyContent='center' mb={3}>
          <Record number='2014' description='The year that computing was added to the UK curriculum. We&apos;ve been supporting teachers and students ever since.' />
          <Record number='>160' description='Countries are taking part, with the UK, the USA, Brazil, Australia and Canada as top locations for schools signed up to CFL. Nearly 10,000 schools are registered globally.' />
          <Record number='>270,000' description='Active users so far, with numbers growing every day. In 2020 alone, close to 100,000 new people subscribed to our resources.' />
        </Grid>
      </BaseSection>

      <BaseSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <TwoColumnSection left={cflIntroLeftChild} right={cflIntroRightChild} />
      </BaseSection>

      <BaseSection>
        <TwoColumnSection left={ocadoIntroLeftChild} right={ocadoIntroRightChild} />
      </BaseSection>

      <BaseSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <Typography variant='h4' textAlign='center' mt={5}>
          Code for Life and Ocado Group
        </Typography>
        <TwoColumnSection left={cflAndOcadoLeftChild} right={cflAndOcadoRightChild}></TwoColumnSection>
      </BaseSection>

      <BaseSection>
        <Typography variant='h4' textAlign='center' mt={5}>
          We couldn&apos;t do it without you!
        </Typography>
        <TwoColumnSection left={participantsLeftChild} right={participantsRightChild}></TwoColumnSection>

        <Grid xs={12} mt={8}>
          <Typography variant='h6' textAlign='center'>
            We would like to thank our friends who have contributed to this initiative
          </Typography>
        </Grid>
        <Grid xs={12} my={1} display='flex' justifyContent='center' alignItems='baseline'>
          <Image alt={'10x'} src={Logo10xImage} boxProps={{ ...logoBoxProps, maxWidth: '52px' }} />
          <Image alt={'bcs'} src={BcsImage} boxProps={{ ...logoBoxProps, maxWidth: '118px' }} />
          <Image alt={'icl'} src={IclImage} boxProps={{ ...logoBoxProps, maxWidth: '113px' }} />
          <Image alt={'barefoot'} src={BarefootImage} boxProps={{ ...logoBoxProps, maxWidth: '88px' }} />
          <Image alt={'mcSaatch'} src={MCSaatchiImage} boxProps={{ ...logoBoxProps, maxWidth: '51px' }} />
          <Image alt={'hope'} src={HOPEImage} boxProps={{ ...logoBoxProps, maxWidth: '118px' }} />
          <Image alt={'gla'} src={GLAImage} boxProps={{ ...logoBoxProps, maxWidth: '59px' }} />
          <Image alt={'pressureCooker'} src={PressureCookerImage} boxProps={{ ...logoBoxProps, maxWidth: '58px' }} />
        </Grid>
        <Grid px={6} my={2}>
          <Typography fontSize={14} textAlign='center' mb={8} lineHeight='1.6rem'>
            10X, BCS Academy of Computing, Barefoot Computing, Computing at School, The National Museum of
            Computing, Imperial College London, M&C Saatchi, Alvaro Ramirez, Jason Fingland, Ramneet Loyall, Sharon
            Harrison, Keith Avery, Dale Coan, Rob Whitehouse, Mandy Nash, Tanya Nothard, Matt Trevor, Moy El-Bushra,
            Richard Siwiak, Peter Tondrow, Liz Pratt, Pressure Cooker Studios, GAL Education, Hope Education.
          </Typography>
        </Grid>
      </BaseSection>

      <BaseSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <Grid container className='flex-center' direction='column' >
          <Typography variant='h4' textAlign='center' mt={5}>
            Dedicated to Sharon Harrison
          </Typography>
          <Image alt={'SharonHarrison'} src={SharonHarrisonImage} boxProps={{ maxWidth: '150px', margin: 3 }} />
          <Typography variant='h5' textAlign='center'>
            1956 — 2015
          </Typography>
        </Grid>
        <Grid container px={5}>
          <Typography className='normalText' fontWeight='bold'>
            Sharon was instrumental in helping to create Code for Life. At the beginning of 2014 she was recruited to act as our Educational Consultant. The project drew on her previous skills as a pioneering computing teacher and education consultant.
          </Typography>
          <Typography fontSize={18} mb={5}>
            Sharon has left a lasting legacy by creating something which will help teach STEM skills to the next generation of computer scientists across the world.
          </Typography>
        </Grid>
      </BaseSection>
    </BasePage >
  );
};

export default AboutUs;
