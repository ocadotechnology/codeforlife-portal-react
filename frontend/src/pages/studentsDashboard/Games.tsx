import React from 'react';
import {
  Typography,
  Stack
} from '@mui/material';

import CflCard from '../../components/CflCard';
import RRLogoGreenImage from '../../images/RR_logo_green.svg';
import KuronoLogoGreyImage from '../../images/kurono_logo_grey_background.svg';
import { paths } from '../../app/router';

const Games: React.FC<{
  isDependent: boolean
}> = ({ isDependent }) => {
  return (
    <Stack
      spacing={4}
      alignItems='center'
    >
      <Typography
        variant='h4'
        textAlign='center'
      >
        Your {isDependent && 'class'} games
      </Typography>
      <Stack
        direction='row'
        gap={5}
      >
        <CflCard
          text={{
            title: 'Rapid Router',
            content: 'Rapid Router guides you, and makes learning to code easy and great fun. Using Blockly, you can advance through the levels to become an Ocado delivery hero.'
          }}
          mediaProps={{
            title: 'RapidRouter logo',
            image: RRLogoGreenImage
          }}
          buttonProps={{
            children: 'Play',
            href: paths.rapidRouter
          }}
        />
        {isDependent &&
          <CflCard
            text={{
              title: 'Kurono',
              content: 'It is the year 2405 and the museum is in big trouble! The priceless artifacts are lost and scattered across timelines. Your team\'s mission is to travel through time and bring them back into the museum.'
            }}
            mediaProps={{
              title: 'Kurono logo',
              image: KuronoLogoGreyImage
            }}
            buttonProps={{
              children: 'Play',
              href: paths.kurono
            }}
          />
        }
      </Stack>
    </Stack>
  );
};

export default Games;
