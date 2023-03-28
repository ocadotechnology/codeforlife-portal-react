import React from 'react';
import {
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useTheme,
  Link
} from '@mui/material';

import BasePage from 'pages/BasePage';

import { Image } from 'codeforlife/lib/esm/components';
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
import { BaseSection } from './BaseSection';
import { PageBanner } from './PageBanner';

const Record: React.FC<{
  number: string
  description: string
}> = ({ number, description }) => (
  <Grid xs={12} md={4}>
    <Stack>
      <Typography variant='h3' style={{ color: '#00a3e0' }} textAlign='center' my={3}>
        {number}
      </Typography>
      <Typography fontSize={18} textAlign='center'>
        {description}
      </Typography>
    </Stack>
  </Grid>
);

const ImageGrid: React.FC<{
  alt: string, src: string, maxWidth: string
}> = ({ alt, src, maxWidth }) => (
  <Grid xs={12} md={1} display='flex' justifyContent='center'>
    <Image alt={alt} src={src} boxProps={{ sx: { mx: 0.5 }, maxWidth: { maxWidth } }} />
  </Grid>
);

const AboutUs: React.FC = () => {
  const theme = useTheme();
  const quoteStyle = { color: '#e0004d', fontSize: 22, fontFamily: 'SpaceGrotesk', fontWeight: '500', lineHeight: '1.8rem' };

  return (
    <BasePage>
      <Grid
        xs={12}
        bgcolor={theme.palette.primary.main}
        p={0}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <PageBanner />
      </Grid>

      <BaseSection>
        <Grid container xs={12}>
          <Grid xs={12} textAlign='center' mt={4}>
            <Typography variant='h5' px={3}>
              Code For Life is a non profit initiative that delivers free, open-source games that help all students learn computing.
            </Typography>
          </Grid>
          <Grid container display='flex' justifyContent='center' mt={1} mb={3} spacing={1}>
            <Record number='2014' description='The year that computing was added to the UK curriculum. We&apos;ve been supporting teachers and students ever since.' />
            <Record number='>160' description='Countries are taking part, with the UK, the USA, Brazil, Australia and Canada as top locations for schools signed up to CFL. Nearly 10,000 schools are registered globally.' />
            <Record number='>270,000' description='Active users so far, with numbers growing every day. In 2020 alone, close to 100,000 new people subscribed to our resources.' />
          </Grid>
        </Grid>
      </BaseSection>

      <BaseSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <Grid container xs={12} spacing={1}>
          <Grid xs={8} md={6} p={3}>
            <Stack>
              <Typography variant='h5' className='headerText' mt={4}>
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
            </Stack>
          </Grid>
          <Grid xs display='flex' alignItems='center' maxWidth='550px' p={3} >
            <Image alt={'aboutUsCFL'} src={AboutUsCFLImage} />
          </Grid>
        </Grid>
      </BaseSection>

      <BaseSection>
        <Grid container xs={12} spacing={1}>
          <Grid xs display='flex' alignItems='center' maxWidth='550px' p={3} >
            <Image alt={'aboutUsOcado'} src={AboutUsOcadoImage} />
          </Grid>
          <Grid xs={8} md={6} p={3}>
            <Typography variant='h5' className='headerText' mt={4}>
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
        </Grid>
      </BaseSection>

      {/* TODO: adjust breakpoints */}
      <BaseSection containerProps={{ bgcolor: theme.palette.info.main }}>
        <Grid container xs={12} spacing={1}>
          <Grid xs={12} mt={5}>
            <Typography variant='h4' textAlign='center'>
              Code for Life and Ocado Group
            </Typography>
          </Grid>
          <Grid container xs={12} p={5} spacing={4}>
            <Grid xs={12} md={6}>
              <Typography style={quoteStyle}>
                “We were delighted computing entered the UK curriculum in 2014. However, many teachers felt unprepared. And the lack of diversity in people studying STEM concerned us. So, we sought to make the subject appeal to a broader group of both students and teachers.”
              </Typography>
              <Typography className='normalText'>
                Anne Marie Neatham, Commercial Director and COO Kindred, Ocado Group.
              </Typography>
            </Grid>
            <Grid xs={12} md={6} mb={3}>
              <Typography fontSize={18} mb={2}>
                With that in mind, CFL was developed by volunteers and interns from Ocado Technology - the technology arm of Ocado Group - and teacher Sharon Harrison, who created the Rapid Router learning materials. Anne Marie continues:
              </Typography>
              <Typography style={quoteStyle}>
                “I&apos;m proud this initiative has been breaking down stereotypes. Children are seeing that you don&apos;t have to fit a certain gender, race or personality type to get coding.”
              </Typography>
              <Typography className='normalText' >
                Today, CFL is operated by a small core team and volunteers.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </BaseSection>

      <BaseSection>
        <Grid container spacing={1}>
          <Grid xs={12} mb={4}>
            <Typography variant='h4' textAlign='center' mt={5}>
              We couldn&apos;t do it without you!
            </Typography>
          </Grid>
          <Grid container xs={12} p={5} spacing={4}>
            <Grid xs={12} md={6}>
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
            <Grid xs={12} md={6}>
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
          </Grid>

          <Grid xs={12} mt={8} px={5}>
            <Typography variant='h6' textAlign='center'>
              We would like to thank our friends who have contributed to this initiative
            </Typography>
          </Grid>
          <Grid container xs={12} my={1} spacing={1} display='flex' justifyContent='center' alignItems='baseline' >
            <ImageGrid alt={'10x'} src={Logo10xImage} maxWidth={'52px'} />
            <ImageGrid alt={'bcs'} src={BcsImage} maxWidth={'118px'} />
            <ImageGrid alt={'icl'} src={IclImage} maxWidth={'113px'} />
            <ImageGrid alt={'barefoot'} src={BarefootImage} maxWidth={'88px'} />
            <ImageGrid alt={'mcSaatch'} src={MCSaatchiImage} maxWidth={'51px'} />
            <ImageGrid alt={'hope'} src={HOPEImage} maxWidth={'118px'} />
            <ImageGrid alt={'gla'} src={GLAImage} maxWidth={'59px'} />
            <ImageGrid alt={'pressureCooker'} src={PressureCookerImage} maxWidth={'58px'} />
          </Grid>
          <Grid px={6} my={2}>
            <Typography fontSize={14} textAlign='center' mb={8} lineHeight='1.6rem'>
              10X, BCS Academy of Computing, Barefoot Computing, Computing at School, The National Museum of
              Computing, Imperial College London, M&C Saatchi, Alvaro Ramirez, Jason Fingland, Ramneet Loyall, Sharon
              Harrison, Keith Avery, Dale Coan, Rob Whitehouse, Mandy Nash, Tanya Nothard, Matt Trevor, Moy El-Bushra,
              Richard Siwiak, Peter Tondrow, Liz Pratt, Pressure Cooker Studios, GAL Education, Hope Education.
            </Typography>
          </Grid>
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
