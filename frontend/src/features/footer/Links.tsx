import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Link,
  LinkProps
} from '@mui/material';

import {
  useFreshworksWidget,
  useOneTrustInfoToggle
} from 'codeforlife/lib/esm/hooks';

import { paths } from '../../app/router';

const LinkStack: React.FC<{
  links: Array<Omit<LinkProps, 'children'> & {
    children: string;
  }>;
}> = ({ links }) => {
  return (
    <Grid xs={12} sm={4}>
      <Stack spacing={1}>
        {links.map((link) =>
          <Link
            key={link.children}
            className='no-decor'
            fontSize='0.95rem'
            fontWeight={600}
            color='#fff'
            {...link}
          />
        )}
      </Stack>
    </Grid>
  );
};

const Links: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={1}>
      <LinkStack links={[
        {
          onClick: () => { navigate(paths.aboutUs._); },
          children: 'About us'
        },
        {
          onClick: () => { useFreshworksWidget('open'); },
          children: 'Help and support'
        }
      ]} />
      <LinkStack links={[
        {
          onClick: () => { navigate(paths.privacyNotice.privacyNotice._); },
          children: 'Privacy notice'
        },
        {
          onClick: () => { navigate(paths.termsOfUse.termsOfUse._); },
          children: 'Terms of use'
        },
        {
          onClick: useOneTrustInfoToggle,
          children: 'Cookie settings'
        }
      ]} />
      <LinkStack links={[
        {
          onClick: () => { navigate(paths.homeLearning._); },
          children: 'Home learning'
        },
        {
          onClick: () => { navigate(paths.getInvolved._); },
          children: 'Get involved'
        },
        {
          onClick: () => { navigate(paths.codingClubs._); },
          children: 'Coding clubs'
        }
      ]} />
    </Grid >
  );
};

export default Links;
