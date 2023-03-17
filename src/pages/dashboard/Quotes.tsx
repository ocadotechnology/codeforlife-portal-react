import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Link
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import ReubenPhoto from 'images/reuben.png';
import SianPhoto from 'images/sian.png';
import RobPhoto from 'images/rob.png';

const Column: React.FC<{
  img: { alt: string, src: string }
  quote: string
  person: { name: string, title: string }
}> = ({ img, quote, person }) => (
  <Grid xs={12} sm={4} className='flex-center'>
    <Stack maxWidth='400px'>
      <Stack alignItems='center'>
        <Image alt={img.alt} src={img.src} boxProps={{ maxWidth: '350px' }} />
        <Typography fontFamily='SpaceGrotesk' fontSize={22}>
          &ldquo;{quote}&rdquo;
        </Typography>
      </Stack>
      <Stack textAlign='end' marginTop={2}>
        <Typography fontWeight='bold'>
          — {person.name}
        </Typography>
        <Typography variant='body2'>
          {person.title}
        </Typography>
      </Stack>
    </Stack>
  </Grid>
);

const Quotes: React.FC = () => {
  return (
    <Grid container rowSpacing={1} columnSpacing={4} padding={3}>
      <Grid xs={12}>
        <Typography variant='h2' textAlign='center'>
          Why you&apos;ll love Code for Life
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography textAlign='center'>
          Don&apos;t just take our word for it, here are some lovely quotes from our fabulous teacher friends. Interested in getting involved?
          <Link>
            {' '}Get in touch.
          </Link>
        </Typography>
      </Grid>
      <Column
        img={{ alt: 'Reuben', src: ReubenPhoto }}
        quote='My year 10&apos;s have been using Rapid Router to develop their Python skills and it has been a great transition into the Python IDE.'
        person={{ name: 'Reuben', title: 'Computer Science teacher' }}
      />
      <Column
        img={{ alt: 'Sian', src: SianPhoto }}
        quote='I like the slow build of layers of block coding that allows students to work at their own pace and fully embed their understanding of the different blocks.'
        person={{ name: 'Sian', title: 'Head of ICT' }}
      />
      <Column
        img={{ alt: 'Rob', src: RobPhoto }}
        quote='You can hit all of the computing curriculum, in a structured way. It is perfect for teachers who are struggling.'
        person={{ name: 'Rob', title: 'ICT teacher' }}
      />
    </Grid>
  );
};

export default Quotes;
