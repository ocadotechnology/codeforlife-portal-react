import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccordionSummary,
  Container,
  Stack,
  IconButton
} from '@mui/material';
import Hamburger from 'hamburger-react';

import { Image } from 'codeforlife/lib/esm/components';

import CflLogo from '../../../images/cfl_logo.png';
import OgLogo from '../../../images/ocado_group.svg';
import { paths } from '../../../app/router';
import HeaderContext from '../HeaderContext';

export interface SummaryProps {
  children: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({
  children
}) => {
  const navigate = useNavigate();
  // @ts-expect-error value is set
  const { expanded, setExpanded } = React.useContext(HeaderContext);

  return (
    <AccordionSummary style={{
      cursor: 'default'
    }}>
      <Container
        maxWidth='xl'
        sx={{
          height: { xs: '80px', lg: '100px' },
          paddingY: '15px'
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          height='100%'
          width='100%'
          gap={5}
        >
          <Image
            alt='Code for Life'
            src={CflLogo}
            maxWidth={{ xs: '65px', lg: '80px' }}
            onClick={() => { navigate(paths._); }}
            marginRight={{ xs: 0, lg: '10px' }}
          />
          <Image
            alt='Ocado Group'
            src={OgLogo}
            maxWidth={{ xs: '115px', lg: '150px' }}
            mx={{ xs: 'auto', lg: 0 }}
            href={process.env.REACT_APP_OCADO_GROUP_HREF}
            hrefInNewTab
          />
          <Stack
            direction='row'
            alignItems='center'
            height='100%'
            width='100%'
            gap={3}
            display={{ xs: 'none', lg: 'flex' }}
          >
            {children}
          </Stack>
          <IconButton sx={{ display: { lg: 'none' } }}>
            <Hamburger
              toggled={expanded}
              direction='right'
              size={20}
              onToggle={(toggled) => { setExpanded(toggled); }}
            />
          </IconButton>
        </Stack>
      </Container>
    </AccordionSummary>
  );
};

export default Summary;
