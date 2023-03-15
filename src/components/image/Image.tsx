import React from 'react';
import { Box } from '@mui/material';

export interface ImageProps {
  alt: string,
  src: string
}

const Image: React.FC<ImageProps> = ({ alt, src }) => {
  return (
    <Box
      component='img'
      alt={alt}
      src={src}
    />
  );
};

export default Image;
