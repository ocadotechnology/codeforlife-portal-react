import React from 'react';

import BaseErrorPage from '../../components/BaseErrorPage';
import KirstyImage from '../../images/kirsty.png';

const Forbidden: React.FC = () => {
  return (
    <BaseErrorPage
      header='Oi!'
      subheader='Kirsty says you&apos;re not allowed there.'
      body='Those pages belong to Kirsty. She won&apos;t let you in even if you ask nicely.'
      img={{ alt: 'kirsty', src: KirstyImage }}
    />
  );
};

export default Forbidden;
