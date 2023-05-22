import React from 'react';

import Characters from './BaseCharacters';
import WesImage from '../../images/wes.png';
import KirstyImage from '../../images/kirsty.png';
import DeeImage from '../../images/dee.png';
import NigelImage from '../../images/nigel.png';
import PhilImage from '../../images/phil.png';

const RapidRouter: React.FC = () => {
  return (
    <Characters
      imageMaxHeight='300px'
      characters={[
        {
          name: 'Wes',
          description: 'Wes is as cunning as a fox, which is weird, because he\'s actually a wolf.',
          image: {
            alt: 'Wes the wolf',
            src: WesImage
          }
        },
        {
          name: 'Kirsty',
          description: 'Kirsty is a girl with big ambitions. Her biggest ambition is to take the crown, and rule the world!',
          image: {
            alt: 'Kirsty the girl',
            src: KirstyImage
          }
        },
        {
          name: 'Dee',
          description: 'Dee is a Mark II DeliviBot. She\'s super friendly and her wire hair sparks when she laughs.',
          image: {
            alt: 'Dee the DeliviBot',
            src: DeeImage
          }
        },
        {
          name: 'Nigel',
          description: 'Nigel is the tallest kid in his class, and he\'s growing taller by the day.',
          image: {
            alt: 'Nigel the boy',
            src: NigelImage
          }
        },
        {
          name: 'Phil',
          description: 'Phil is a Boarsnark, however, he is different to most Boarsnarks because he\'s very kind, and very gentle.',
          image: {
            alt: 'Phil the Boarsnark',
            src: PhilImage
          }
        }
      ]}
    />
  );
};

export default RapidRouter;
