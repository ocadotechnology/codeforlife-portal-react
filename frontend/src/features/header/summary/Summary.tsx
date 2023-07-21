import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccordionSummary,
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
    <AccordionSummary style={{ cursor: 'default' }}>
      <Stack
        direction='row'
        alignItems='center'
        width='100%'
        gap={5}
        height={{ xs: '80px', lg: '100px' }}
        paddingX='15px'
      >
        <Image
          alt='Code for Life'
          src={CflLogo}
          maxWidth={{ xs: '65px', lg: '80px' }}
          onClick={() => { navigate(paths._); }}
          style={{ cursor: 'pointer' }}
          marginRight={{ xs: 0, lg: '10px' }}
        />
        <Image
          alt='Ocado Group'
          src={OgLogo}
          maxWidth={{ xs: '100px', lg: '120px' }}
          mx={{ xs: 'auto', lg: 0 }}
          href={process.env.REACT_APP_OCADO_GROUP_HREF}
          hrefInNewTab
        />
        <Stack
          direction='row'
          alignItems='center'
          height='100%'
          width='100%'
          gap={4}
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
    </AccordionSummary>
  );
};

export default Summary;
