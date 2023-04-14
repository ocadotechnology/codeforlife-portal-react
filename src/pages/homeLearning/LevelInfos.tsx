import React from 'react';
import {
  Container,
  Unstable_Grid2 as Grid,
  GridDirection,
  Typography
} from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import CflCard from 'components/CflCard';

import RRBeginnerImage from 'images/rr_beginner.png';

const Sessions: React.FC<{
  title: string,
  children: React.ReactNode,
}> = ({ title, children }) => {
  return <>
    <Typography variant='h6'>
      {title}
    </Typography>
    <Typography>
      {children}
    </Typography>
  </>;
};

const LevelInfo: React.FC<{
  level: { difficulty: string, textcolor: string, bgcolor: string },
  card: { img: { alt: string, src: string }, text: { title: string, content: string } }
  children: React.ReactNode,
  direction?: ResponsiveStyleValue<GridDirection>
}> = ({ level, card, children, direction }) => {
  return <>
    <Grid xs={12} bgcolor={level.bgcolor} sx={{ maxHeight: '60px' }}>
      <Container maxWidth='lg'>
        <Typography variant='h4' color={level.textcolor}>
          &lt; {level.difficulty} &gt;
        </Typography>
      </Container>
    </Grid>
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={{ xs: 2, lg: 4 }}
        display='flex'
        direction={direction}
        paddingY={5}
      >
        <Grid xs={12} md={4}>
          <CflCard
            img={{ alt: card.img.alt, src: card.img.src }}
            text={{ title: card.text.title, content: card.text.content }}
            btn={{ btnText: 'Go to lessons', endIcon: <OpenInNewIcon /> }}
          />
        </Grid>
        <Grid xs={12} md={8}>
          {children}
        </Grid>
      </Grid >
    </Container>
  </>;
};

const LevelInfos: React.FC = () => {
  const BeginnerContent = 'Teach your child about problem-solving and logical reasoning as they play. They\'ll explore algorithms, and learn how to create and debug simple programs. Designed for children aged 5-7, but start here if you\'ve never played Rapid Router.';

  return <>
    <LevelInfo
      level={{
        difficulty: 'Beginner',
        textcolor: 'White',
        bgcolor: '#00a3e0'
      }}
      card={{
        img: { alt: 'RR beginner image', src: RRBeginnerImage },
        text: { title: 'Beginner', content: BeginnerContent }
      }}
    >
      <Typography variant='h5'>
        Levels 1-16
      </Typography>
      <Sessions title='Session 1'>
        Print off the worksheets, and cut them out to play offline. This helps children see that they need to give the computer clear instructions so it can understand how to move the van.
      </Sessions>
      <Sessions title='Session 2'>
        Explore Rapid Router online and learn how to play. Print the left-right van on page 6, to help avoid any confusion between left and right. Once a child has understood the basics, they can work on levels 1 to 5.
      </Sessions>
      <Sessions title='Session 3'>
        Plan longer routes with more turns to learn how to create more complex algorithms. The direct drive buttons make things a little easier for younger children, or those with learning difficulties while they build confidence.
      </Sessions>
      <Sessions title='Session 4 & 5'>
        Print off worksheets focusing on efficient routes and planning using levels 13 and 14. Levels 15-16 include routes where there is more than one delivery to make and some complex and tangled routes.
      </Sessions>
    </LevelInfo >
  </>;
};

export default LevelInfos;
