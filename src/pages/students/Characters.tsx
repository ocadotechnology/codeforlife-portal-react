import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';

import {
  Image,
  ImageProps,
  OrderedGrid
} from 'codeforlife/lib/esm/components';

const Characters: React.FC<{
  characters: Array<{
    name: string
    description: string
    image: Pick<ImageProps, 'alt' | 'src'>
  }>,
  imageMaxHeight: string
}> = ({ characters, imageMaxHeight }) => {
  const md = 12 / characters.length;

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant='h4' textAlign='center'>
          Meet the characters
        </Typography>
      </Grid>
      <OrderedGrid
        rows={[
          characters.map((character, index) => ({
            element: (
              <Image
                key={index}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: imageMaxHeight
                }}
                {...character.image}
              />
            ),
            itemProps: { className: 'flex-center' }
          })),
          characters.map((character, index) => ({
            element: (
              <Typography key={index} variant='h5'>
                {character.name}
              </Typography>
            )
          })),
          characters.map((character, index) => ({
            element: (
              <Typography key={index}>
                {character.description}
              </Typography>
            )
          }))
        ]}
        globalItemProps={{
          xs: 12,
          sm: 6,
          md,
          lg: md,
          xl: md
        }}
      />
    </Grid>
  );
};

export default Characters;
