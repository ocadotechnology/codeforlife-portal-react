import React from 'react';
import {
  Typography
} from '@mui/material';

import ErrorTemplate from './ErrorTemplate';
import NigelImage from 'images/nigel.png';

const Error404: React.FC = () => {
  return (
    <ErrorTemplate img={{ alt: 'nigel', src: NigelImage }}>
      <Typography variant='h2'>Uh oh!</Typography>
      <Typography variant='h5'>Sorry, Nigel can&apos;t find the page you were looking for.</Typography>
      <Typography>This might be because you have entered a web address incorrectly or the page has moved.</Typography>
    </ErrorTemplate>
  );
};

export default Error404;
