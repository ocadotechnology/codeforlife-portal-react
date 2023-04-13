import React from 'react';
import {
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useTheme,
  Link
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import Logo10xImage from 'images/10x_logo.png';
import BcsImage from 'images/bcs_logo.png';
import IclImage from 'images/icl_logo.png';
import BarefootImage from 'images/barefoot_logo.png';
import MCSaatchiImage from 'images/mc_saatchi_logo.png';
import HOPEImage from 'images/hope_logo.png';
import GLAImage from 'images/gla_logo.png';
import PressureCookerImage from 'images/pressure_cooker_logo.png';

const ImageGrid: React.FC<{
  alt: string,
  src: string,
  maxWidth: string
}> = ({ alt, src, maxWidth }) => (
  <Grid xs={12} md={1} display='flex' justifyContent='center'>
    <Image alt={alt} src={src} boxProps={{ sx: { mx: 0.5 }, maxWidth: { maxWidth } }} />
  </Grid>
);

const Supporters: React.FC = () => {
  return <>
    <Grid
      container
      spacing={1}
      padding={3}
    >
      <Grid xs={12}>
        <Typography variant='h4' textAlign='center'>
          We couldn&apos;t do it without you!
        </Typography>
      </Grid>
      <Grid
        xs={12}
        container
        padding={3}
        spacing={{ xs: 0, md: 4 }}
      >
        <Grid xs={12} md={6}>
          <Typography variant='h5'>
            Our team and volunteers
          </Typography>
          <Typography>
            Code for Life would not have been possible without the time and skills volunteered by our talented developers and creatives at Ocado Technology. Thank you to everyone who has helped us get to where we are now.
          </Typography>
          <Typography variant='h5'>
            Want to get involved?
          </Typography>
          <Typography>
            We are open source, so anyone can ask to contribute. You can play with game-running JavaScript, Python/Django, animation using SVG and Raphael, and a lot more. We&apos;d like input from all sorts of backgrounds, whether you&apos;re: a programmer looking for a creative outlet; a teacher hoping to shape the resources; or even a pupil putting your skills to the test.
          </Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant='h5'>
            Developers
          </Typography>
          <Typography>
            To contribute, head over to <Link href={process.env.REACT_APP_PORTAL_GITHUB_HREF} color="inherit" underline="always" target="_blank">GitHub</Link>, check out the issue tracker, and get started. There you can suggest new features or assign yourself an issue to develop. You can find more info about how to do all these on our <Link href={process.env.REACT_APP_CFL_DOCS_HREF} color="inherit" underline="always" target="_blank">docs on Gitbook</Link>.
          </Typography>
          <Typography variant='h5'>
            Teachers, parents, and creatives
          </Typography>
          <Typography>
            Please get in touch through our <Link color="inherit" underline="always">contact</Link> form and let us know how you would like to get involved.
          </Typography>
          <Typography>
            We would like to thank our friends who have contributed to this initiative.
          </Typography>
        </Grid>
      </Grid>

      <Grid xs={12} mt={5} px={5}>
        <Typography variant='h6' textAlign='center'>
          We would like to thank our friends who have contributed to this initiative
        </Typography>
      </Grid>
      <Grid
        container
        xs={12}
        my={1}
        spacing={1}
        display='flex'
        justifyContent='center'
        alignItems='baseline'
      >
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
        <Typography
          fontSize={14}
          textAlign='center'
          mb={4}
          lineHeight='1.6rem'
        >
          10X, BCS Academy of Computing, Barefoot Computing, Computing at School, The National Museum of
          Computing, Imperial College London, M&C Saatchi, Alvaro Ramirez, Jason Fingland, Ramneet Loyall, Sharon
          Harrison, Keith Avery, Dale Coan, Rob Whitehouse, Mandy Nash, Tanya Nothard, Matt Trevor, Moy El-Bushra,
          Richard Siwiak, Peter Tondrow, Liz Pratt, Pressure Cooker Studios, GAL Education, Hope Education.
        </Typography>
      </Grid>
    </Grid >
  </>;
};

export default Supporters;
