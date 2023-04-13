import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Grid2Props,
  Typography
} from '@mui/material';

import { Image, ImageProps } from 'codeforlife/lib/esm/components';

const Characters: React.FC<{
  characters: Array<{
    name: string
    description: string
    image: Pick<ImageProps, 'alt' | 'src'>
  }>,
  imageMaxHeight: string
}> = ({ characters, imageMaxHeight }) => {
  const images = characters.map(c => c.image);
  const names = characters.map(c => c.name);
  const descriptions = characters.map(c => c.description);

  const getProps = (
    itemIndex: number, rowIndex: number
  ): Grid2Props => {
    const xs = 12;
    const sm = 6;
    const md = xs / characters.length;

    const getColsPerRow = (size: number): number => Math.floor(12 / size);

    const getOrder = (size: number): number => (
      (Math.floor(itemIndex / getColsPerRow(size)) * 3) + rowIndex
    );

    const getOffset = (size: number): number => {
      const colsPerRow = getColsPerRow(size);
      return (
        characters.length % colsPerRow !== 0 &&
        // only apply offset to last item
        itemIndex === characters.length - 1
      )
        ? size / colsPerRow
        : 0;
    };

    return {
      xs,
      sm,
      md,
      xsOffset: getOffset(xs),
      smOffset: getOffset(sm),
      mdOffset: getOffset(md),
      order: {
        xs: getOrder(xs),
        sm: getOrder(sm),
        md: getOrder(md)
      }
    };
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant='h4' textAlign='center'>
          Meet the characters
        </Typography>
      </Grid>
      {images.map((image, index) => (
        <Grid
          key={`image-${index}`}
          className='flex-center'
          {...getProps(index, 0)}
        >
          <Image
            {...image}
            boxProps={{
              style: {
                width: 'auto',
                height: 'auto',
                maxHeight: imageMaxHeight
              }
            }}
          />
        </Grid>
      ))}
      {names.map((name, index) => (
        <Grid
          key={`name-${index}`}
          {...getProps(index, 1)}
        >
          <Typography variant='h5'>
            {name}
          </Typography>
        </Grid>
      ))}
      {descriptions.map((description, index) => (
        <Grid
          key={`description-${index}`}
          {...getProps(index, 2)}
        >
          <Typography>
            {description}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Characters;
