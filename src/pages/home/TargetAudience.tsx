import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  ButtonProps
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { Image, ImageProps, OrderedGrid } from 'codeforlife/lib/esm/components';

import { paths } from 'app/router';
import EducateImage from 'images/dashboard_educate.png';
import PlayImage from 'images/dashboard_play.png';

const TargetAudience: React.FC = () => {
  const images: ImageProps[] = [
    { alt: 'teacher with student', src: EducateImage },
    { alt: 'kids playing', src: PlayImage }
  ];
  const headers: string[] = [
    'Educate',
    'Play'
  ];
  const bodies: string[] = [
    'Helping teachers and families to inspire the next generation of computer scientists.',
    'Anyone can learn how to code. We will help you learn how. It\'s fun, free and easy.'
  ];
  const buttons: ButtonProps[] = [
    { children: 'Learn more', href: paths.teachers },
    { children: 'Get started', href: paths.students }
  ];

  return (
    <OrderedGrid
      containerProps={{ columnSpacing: 4 }}
      rows={[
        images.map((image) => ({
          element: (
            <Image
              {...image}
              maxWidth='450px'
            />
          ),
          itemProps: { className: 'flex-center' }
        })),
        headers.map((header) => ({
          element: (
            <Typography
              variant='h2'
              style={{ color: 'white' }}
            >
              {header}
            </Typography>
          )
        })),
        bodies.map((body) => ({
          element: (
            <Typography
              fontSize={21}
              style={{ color: 'white' }}
            >
              {body}
            </Typography>
          )
        })),
        buttons.map((button) => ({
          element: (
            <Button
              color='white'
              endIcon={<ChevronRightIcon />}
              sx={{ mb: { xs: 2, sm: 0 } }}
              {...button}
            />
          ),
          itemProps: { className: 'flex-end' }
        }))
      ]}
      globalItemProps={{
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6
      }}
    />
  );
};

export default TargetAudience;
