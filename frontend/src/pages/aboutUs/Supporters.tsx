import React from 'react';
import {
  Typography,
  Unstable_Grid2 as Grid,
  Link,
  Stack
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';
import { useFreshworksWidget } from 'codeforlife/lib/esm/hooks';

import Logo10xImage from '../../images/10x_logo.png';
import BcsImage from '../../images/bcs_logo.png';
import IclImage from '../../images/icl_logo.png';
import BarefootImage from '../../images/barefoot_logo.png';
import MCSaatchiImage from '../../images/mc_saatchi_logo.png';
import HOPEImage from '../../images/hope_logo.png';
import GLAImage from '../../images/gla_logo.png';
import PressureCookerImage from '../../images/pressure_cooker_logo.png';

const Supporter: React.FC<{
  alt: string,
  src: string,
  maxHeight: string
}> = ({ alt, src, maxHeight }) => (
  <Image
    alt={alt}
    src={src}
    maxHeight={maxHeight}
    style={{ width: 'auto' }}
  />
);

const Supporters: React.FC = () => {
  return <>
    <Typography variant='h4' textAlign='center'>
      We couldn&apos;t do it without you!
    </Typography>
    <Grid container spacing={4}>
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
          Please get in touch through our <Link onClick={() => { useFreshworksWidget('open'); }}>contact</Link> form and let us know how you would like to get involved.
        </Typography>
        <Typography>
          We would like to thank our friends who have contributed to this initiative.
        </Typography>
      </Grid>
    </Grid>
    <Typography
      variant='h6'
      textAlign='center'
      mt={5}
    >
      We would like to thank our friends who have contributed to this initiative
    </Typography>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems='center'
      justifyContent='center'
      spacing={2}
      mb={2}
    >
      <Supporter alt={'10x'} src={Logo10xImage} maxHeight={'52px'} />
      <Supporter alt={'bcs'} src={BcsImage} maxHeight={'118px'} />
      <Supporter alt={'icl'} src={IclImage} maxHeight={'50px'} />
      <Supporter alt={'barefoot'} src={BarefootImage} maxHeight={'88px'} />
      <Supporter alt={'mcSaatch'} src={MCSaatchiImage} maxHeight={'51px'} />
      <Supporter alt={'hope'} src={HOPEImage} maxHeight={'40px'} />
      <Supporter alt={'gla'} src={GLAImage} maxHeight={'59px'} />
      <Supporter alt={'pressureCooker'} src={PressureCookerImage} maxHeight={'58px'} />
    </Stack>
    <Typography
      textAlign='center'
      variant='body2'
      mb={0}
    >
      10X, BCS Academy of Computing, Barefoot Computing, Computing at School, The National Museum of
      Computing, Imperial College London, M&C Saatchi, Alvaro Ramirez, Jason Fingland, Ramneet Loyall, Sharon
      Harrison, Keith Avery, Dale Coan, Rob Whitehouse, Mandy Nash, Tanya Nothard, Matt Trevor, Moy El-Bushra,
      Richard Siwiak, Peter Tondrow, Liz Pratt, Pressure Cooker Studios, GAL Education, Hope Education.
    </Typography>
  </>;
};

export default Supporters;
