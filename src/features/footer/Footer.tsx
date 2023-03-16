import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Link,
  Typography,
  Button
} from '@mui/material';

const FooterLinks: React.FC = () => (
  <Grid container>
    <Grid xs={4}>
      <Stack>
        <Link>
          About us
        </Link>
        <Link>
          Help and support
        </Link>
      </Stack>
    </Grid>
    <Grid xs={4}>
      <Stack>
        <Link>
          Privacy Notice
        </Link>
        <Link>
          Terms of use
        </Link>
        <Link>
          Cookie settings
        </Link>
      </Stack>
    </Grid>
    <Grid xs={4}>
      <Stack>
        <Link>
          Home learning
        </Link>
        <Link>
          Get involved
        </Link>
        <Link>
          Coding clubs
        </Link>
      </Stack>
    </Grid>
  </Grid>
);


const FooterLogos: React.FC = () => (
  <Grid container>
    <Grid xs={12}>
      cfl
    </Grid>
    <Grid xs={3}>
      fb
    </Grid>
    <Grid xs={3}>
      tw
    </Grid>
    <Grid xs={6}>
      ocado
    </Grid>
  </Grid>
);

const FooterSignUp: React.FC = () => (
  <Grid container>
    <Grid xs={12}>
      <Typography>
        Sign up to receive updates about Code for Life games and teaching resources.
      </Typography>
    </Grid>
    <Grid xs={12}>
      email field
    </Grid>
    <Grid xs={10}>
      tickbox
    </Grid>
    <Grid xs={2}>
      button
    </Grid>
  </Grid>
);


const FooterCopyright: React.FC = () => (
  <Typography>
    © Ocado Group 2023
  </Typography>
);

export default function Footer(): JSX.Element {
  return (
    <Grid container>
      <Grid xs={8}>
        <FooterLinks />
      </Grid>
      <Grid xs={4}>
        <FooterLogos />
      </Grid>
      <Grid xs={8}>
        <FooterSignUp />
      </Grid>
      <Grid xs={12}>
        <FooterCopyright />
      </Grid>
    </Grid>
  );
}