import React from 'react';

import BaseErrorPage from '../../components/BaseErrorPage';
import NigelImage from '../../images/nigel.png';

const PageNotFound: React.FC = () => {
  return (
    <BaseErrorPage
      header='Uh oh!'
      subheader='Sorry, Nigel can&apos;t find the page you were looking for.'
      body='This might be because you have entered a web address incorrectly or the page has moved.'
      img={{ alt: 'nigel', src: NigelImage }}
    />
  );
};

export default PageNotFound;
