import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import { paths } from 'app/router';
import EducateImage from 'images/dashboard_educate.png';
import PlayImage from 'images/dashboard_play.png';

const Content: React.FC<{
  index: number
  img: { alt: string, src: string }
  text: { header: string, body: string }
  btn: { text: string, href: string }
}> = ({ index, img, text, btn }) => <>{
  [
    {
      props: { className: 'flex-center' },
      children: (
        <Image
          alt={img.alt}
          src={img.src}
          boxProps={{ maxWidth: '450px' }}
        />
      )
    },
    {
      children: (
        <Typography
          variant='h2'
          style={{ color: 'white' }}
        >
          {text.header}
        </Typography>
      )
    },
    {
      children: (
        <Typography
          fontSize={21}
          style={{ color: 'white' }}
        >
          {text.body}
        </Typography>
      )
    },
    {
      props: { className: 'flex-end' },
      children: (
        <Button
          color='white'
          href={btn.href}
          endIcon={<ChevronRightIcon />}
          sx={{ mb: { xs: 2, sm: 0 } }}
        >
          {btn.text}
        </Button>
      )
    }
  ].map((grid, gridIndex) => <>
    <Grid
      xs={12} sm={6}
      order={{ sm: (gridIndex * 2) + 1 + index }}
      {...grid.props}
    >
      {grid.children}
    </Grid>
  </>)
}</>;

const TargetAudience: React.FC = () => <>
  <Grid container columnSpacing={4}>
    <Content
      index={0}
      img={{ alt: 'teacher with student', src: EducateImage }}
      text={{ header: 'Educate', body: 'Helping teachers and families to inspire the next generation of computer scientists.' }}
      btn={{ text: 'Learn more', href: paths.teachers }}
    />
    <Content
      index={1}
      img={{ alt: 'kids playing', src: PlayImage }}
      text={{ header: 'Play', body: "Anyone can learn how to code. We will help you learn how. It's fun, free and easy." }}
      btn={{ text: 'Get started', href: paths.students }}
    />
  </Grid>
</>;

export default TargetAudience;
