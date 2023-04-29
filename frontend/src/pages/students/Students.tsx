import React from 'react';
import {
  useTheme
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';

import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import PageBanner from '../../components/PageBanner';

import PlayImage from '../../images/home_play_hero.png';
import WesImage from '../../images/wes.png';
import KirstyImage from '../../images/kirsty.png';
import DeeImage from '../../images/dee.png';
import NigelImage from '../../images/nigel.png';
import PhilImage from '../../images/phil.png';
import XianImage from '../../images/Xian.png';
import JoolsImage from '../../images/Jools.png';
import ZayedImage from '../../images/Zayed.png';

import RapidRouter from './RapidRouter';
import Characters from './Characters';
import Kurono from './Kurono';

const Students: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage>
      <PageBanner
        text={{
          title: 'Play',
          content: 'Anyone can learn how to code. We will help you learn how. It\'s fun, free and easy.'
        }}
        img={{
          alt: 'Child on tablet',
          src: PlayImage
        }}
        btn={{
          children: 'Play Rapid Router',
          endIcon: <ChevronRightIcon />,
          href: paths.rapidRouter
        }}
      />
      <PageSection>
        <RapidRouter />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
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
      </PageSection>
      <PageSection>
        <Kurono />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
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
      </PageSection>
    </BasePage>
  );
};

export default Students;
