import React from 'react';
import {
  AccordionDetails
} from '@mui/material';

import {
  useFreshworksWidget,
  useOneTrustInfoToggle
} from 'codeforlife/lib/esm/hooks';

import DetailsButton from './DetailsButton';
import { paths } from '../../../app/router';

export interface DetailsProps {
  children: React.ReactNode;
}

const Details: React.FC<DetailsProps> = ({
  children
}) => {
  return (
    <AccordionDetails>
      {children}
      <DetailsButton href={paths.aboutUs._}>
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
      <DetailsButton href={paths.privacyNotice._}>
        Privacy notice
      </DetailsButton>
      <DetailsButton href={paths.termsOfUse._}>
        Terms of use
      </DetailsButton>
      <DetailsButton href={paths.homeLearning._}>
        Home learning
      </DetailsButton>
      <DetailsButton href={paths.getInvolved._}>
        Get involved
      </DetailsButton>
    </AccordionDetails>
  );
};

export default Details;
