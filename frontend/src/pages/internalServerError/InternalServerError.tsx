import React from 'react';

import BaseErrorPage from '../../components/BaseErrorPage';
import DeeImage from '../../images/dee.png';

const InternalServerError: React.FC = () => {
  return (
    <BaseErrorPage
      header='Zap!'
      subheader='Oh dear! Something technical has gone wrong.'
      body='Dee will attempt to fix this soon.'
      img={{ alt: 'dee', src: DeeImage }}
    />
  );
};

export default InternalServerError;
