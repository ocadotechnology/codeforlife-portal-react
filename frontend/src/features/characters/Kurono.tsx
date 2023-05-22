import React from 'react';

import Characters from './BaseCharacters';
import XianImage from '../../images/Xian.png';
import JoolsImage from '../../images/Jools.png';
import ZayedImage from '../../images/Zayed.png';

const Kurono: React.FC = () => {
  return (
    <Characters
      imageMaxHeight='450px'
      characters={[
        {
          name: 'Xian',
          description: 'Fun, active, will dance to just about anything that produces a beat. Has great memory, always a joke at hand, might try to introduce memes in Ancient Greece. Scored gold in a track race once and will take any opportunity to bring that up.',
          image: {
            alt: 'Xian',
            src: XianImage
          }
        },
        {
          name: 'Jools',
          description: 'A quick-witted kid who wasn\'t expecting to embark in a time-warping journey but can\'t say no to a challenge. Someone has to keep the rest of the group in check, after all!',
          image: {
            alt: 'Jools',
            src: JoolsImage
          }
        },
        {
          name: 'Zayed',
          description: 'A pretty chill, curious soul that prefers practice to theory. Always ready to jump into an adventure if it looks interesting enough; not so much otherwise. Probably the one who accidentally turned the time machine on in the first place.',
          image: {
            alt: 'Zayed',
            src: ZayedImage
          }
        }
      ]}
    />
  );
};

export default Kurono;
