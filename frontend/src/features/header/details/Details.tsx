import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AccordionDetails } from '@mui/material';

import {
  useFreshworksWidget,
  useOneTrustInfoToggle
} from 'codeforlife/lib/esm/hooks';

import DetailsButton from './DetailsButton';
import { paths } from '../../../app/routes';

export interface DetailsProps {
  children: React.ReactNode;
}

const Details: React.FC<DetailsProps> = ({
  children
}) => {
  const navigate = useNavigate();

  return (
    <AccordionDetails>
      {children}
      <DetailsButton onClick={() => { navigate(paths.aboutUs._); }}>
        About us
      </DetailsButton>
      <DetailsButton
        onClick={() => { useFreshworksWidget('open'); }}
      >
        Help and support
      </DetailsButton>
      <DetailsButton onClick={useOneTrustInfoToggle}>
        Cookie settings
      </DetailsButton>
      <DetailsButton onClick={() => { navigate(paths.privacyNotice.privacyNotice._); }}>
        Privacy notice
      </DetailsButton>
      <DetailsButton onClick={() => { navigate(paths.termsOfUse.termsOfUse._); }}>
        Terms of use
      </DetailsButton>
      <DetailsButton onClick={() => { navigate(paths.homeLearning._); }}>
        Home learning
      </DetailsButton>
      <DetailsButton onClick={() => { navigate(paths.getInvolved._); }}>
        Get involved
      </DetailsButton>
    </AccordionDetails>
  );
};

export default Details;
