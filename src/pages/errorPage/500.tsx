import React from 'react';
import {
  Typography
} from '@mui/material';

import ErrorTemplate from './ErrorTemplate';
import DeeImage from 'images/dee.png';

const Error500: React.FC = () => {
  return (
    <ErrorTemplate img={{ alt: 'dee', src: DeeImage }}>
      <Typography variant='h2'>Zap!</Typography>
      <Typography variant='h5'>Oh dear! Something technical has gone wrong.</Typography>
      <Typography>Dee will attempt to fix this soon.</Typography>
    </ErrorTemplate>
  );
};

export default Error500;
