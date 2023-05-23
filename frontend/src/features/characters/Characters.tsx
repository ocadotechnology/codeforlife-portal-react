import React from 'react';

import Kurono from './Kurono';
import RapidRouter from './RapidRouter';

const Characters: React.FC<{
  game: 'kurono' | 'rapid-router'
}> = ({ game }) => {
  switch (game) {
    case 'kurono':
      return <Kurono />;
    case 'rapid-router':
      return <RapidRouter />;
  }
};

export default Characters;
