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
  text: string
}> = ({ img, text }) => (
  <Grid xs={12} sm={4}>
    <Stack>
      <Image alt={img.alt} src={img.src} />
      <Typography>
        &quot;{text}&quot;
      </Typography>
    </Stack>
  </Grid>
);

const Quotes: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant='h2' textAlign='center'>
          Why you&apos;ll love Code for Life
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>
          Don&apos;t just take our word for it, here are some lovely quotes from our fabulous teacher friends. Interested in getting involved?
          <Link>
            {' '}Get in touch.
          </Link>
        </Typography>
      </Grid>
      <Column
        img={{ alt: 'Reuben', src: ReubenPhoto }}
        text='My year 10&apos;s have been using Rapid Router to develop their Python skills and it has been a great transition into the Python IDE.'
      />
      <Column
        img={{ alt: 'Sian', src: SianPhoto }}
        text='I like the slow build of layers of block coding that allows students to work at their own pace and fully embed their understanding of the different blocks.'
      />
      <Column
        img={{ alt: 'Rob', src: RobPhoto }}
        text='You can hit all of the computing curriculum, in a structured way. It is perfect for teachers who are struggling.'
      />
    </Grid>
  );
};

export default Quotes;
