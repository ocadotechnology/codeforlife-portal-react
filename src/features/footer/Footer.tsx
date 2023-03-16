import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Link,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  EmailOutlined as EmailIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';
import CflLogo from 'images/cfl_logo_white_landscape.png';
import { ReactComponent as OcadoGroupIcon } from 'images/ocado_group_white.svg';
import { ReactComponent as TwitterIcon } from 'images/twitter_icon.svg';
import { ReactComponent as FbIcon } from 'images/facebook_icon.svg';

const FooterLinks: React.FC = () => (
  <Grid container spacing={0}>
    <Grid xs={12} sm={4}>
      <Stack>
        <Link>
          About us
        </Link>
        <Link>
          Help and support
        </Link>
      </Stack>
    </Grid>
    <Grid xs={12} sm={4}>
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
    <Grid xs={12} sm={4}>
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

const FooterLogos: React.FC = () => {
  const theme = useTheme();

  let [iconSize, iconWidth] = [60, '100%'];
  if (useMediaQuery(theme.breakpoints.only('sm'))) {
    iconSize = 40; iconWidth = '66%';
  }

  return (
    <Grid container>
      <Grid xs={12} order={{ xs: 2, sm: 1 }}>
        <Image
          alt='Code for Life logo'
          src={CflLogo}
        />
      </Grid>
      <Grid
        xs={3} xsOffset={3} smOffset={0}
        order={{ xs: 1, sm: 2 }}
        className='flex-center'
      >
        <IconButton sx={{ padding: 0 }}>
          <FbIcon fontSize={iconSize} color='white' />
        </IconButton>
      </Grid>
      <Grid
        xs={3} order={{ xs: 1, sm: 2 }}
        className='flex-center'
      >
        <IconButton sx={{ padding: 0 }}>
          <TwitterIcon fontSize={iconSize} color='white' />
        </IconButton>
      </Grid>
      <Grid
        xs={12} sm={6} order={{ xs: 4 }}
        className='flex-center'
      >
        <IconButton>
          <OcadoGroupIcon color='white' width={iconWidth} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const FooterSignUp: React.FC = () => (
  <Grid container>
    <Grid xs={12}>
      <Typography>
        Sign up to receive updates about Code for Life games and teaching resources.
      </Typography>
    </Grid>
    <Grid xs={12}>
      <TextField
        required
        id='email'
        label='Email'
        type='email'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <EmailIcon />
            </InputAdornment>
          )
        }}
      />
    </Grid>
    <Grid xs={12} sm={10}>
      <FormControlLabel
        control={<Checkbox required />}
        label='Please confirm that you are over 18.'
      />
    </Grid>
    <Grid xs={12} sm={2}>
      <Button type='submit' fullWidth>
        Sign up
      </Button>
    </Grid>
  </Grid>
);

const FooterCopyright: React.FC = () => (
  <Typography>
    © Ocado Group 2023
  </Typography>
);

const Footer: React.FC = () => {
  return (
    <Grid
      container
      sx={{ bgcolor: 'pink' }}
      padding={3}
      spacing={1}
    >
      <Grid xs={12} sm={8} xl={6} xlOffset={1} order={{ xs: 1 }}>
        <FooterLinks />
      </Grid>
      <Grid xs={12} sm={4} xl={3} order={{ xs: 3, sm: 2 }}>
        <FooterLogos />
      </Grid>
      <Grid xs={12} sm={8} xl={6} xlOffset={1} order={{ xs: 2, sm: 3 }}>
        <FooterSignUp />
      </Grid>
      <Grid xs={12} order={{ xs: 4 }} display='flex' justifyContent='center'>
        <FooterCopyright />
      </Grid>
    </Grid>
  );
};

export default Footer;
