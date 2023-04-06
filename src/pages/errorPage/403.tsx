import React from 'react';
import {
  Typography
} from '@mui/material';

import ErrorTemplate from './ErrorTemplate';
import KirstyImage from 'images/kirsty.png';

const Error403: React.FC = () => {
  return (
    <ErrorTemplate img={{ alt: 'kirsty', src: KirstyImage }}>
      <Typography variant='h2'>Oi!</Typography>
      <Typography variant='h5'>Kirsty says you&apos;re not allowed there.</Typography>
      <Typography>Those pages belong to Kirsty. She won&apos;t let you in even if you ask nicely.</Typography>
    </ErrorTemplate>
  );
};

export default Error403;
