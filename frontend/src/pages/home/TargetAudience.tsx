import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  ButtonProps,
  useTheme,
  SxProps,
  Stack
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { Image, ImageProps, OrderedGrid } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import EducateImage from '../../images/dashboard_educate.png';
import PlayImage from '../../images/dashboard_play.png';

const TargetAudience: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const padding = {
    xs: theme.spacing(2),
    md: theme.spacing(4),
    lg: theme.spacing(6)
  };

  const commonItemSxProps: SxProps[] = [
    {
      backgroundColor: theme.palette.primary.main,
      paddingX: padding
    },
    {
      backgroundColor: theme.palette.tertiary.main,
      paddingX: padding
    }
  ];
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
    {
      children: 'Learn more',
      onClick: () => { navigate(paths.teacher._); }
    },
    {
      children: 'Get started',
      onClick: () => { navigate(paths.student._); }
    }
  ];

  return (
    <OrderedGrid
      rows={[
        images.map((image, index) => ({
          element: (
            <Image
              {...image}
              maxWidth='550px'
            />
          ),
          itemProps: {
            className: 'flex-center',
            sx: commonItemSxProps[index]
          }
        })),
        headers.map((header, index) => ({
          element: (
            <Typography
              variant='h1'
              style={{ color: 'white' }}
            >
              {header}
            </Typography>
          ),
          itemProps: {
            sx: commonItemSxProps[index]
          }
        })),
        bodies.map((body, index) => ({
          element: (
            <Stack direction={{ xs: 'column', lg: 'row' }}>
              <Typography
                fontSize='1.4rem !important'
                fontWeight={500}
                sx={{
                  color: 'white !important',
                  mb: { lg: 0 },
                  mr: { lg: theme.spacing(3) }
                }}
              >
                {body}
              </Typography>
              <Button
                style={{ backgroundColor: 'white' }}
                endIcon={<ChevronRightIcon />}
                sx={{ ml: 'auto', mt: 'auto' }}
                {...buttons[index]}
              />
            </Stack>
          ),
          itemProps: {
            sx: {
              ...commonItemSxProps[index],
              paddingBottom: padding
            }
          }
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
