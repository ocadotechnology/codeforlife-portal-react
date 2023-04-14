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
import RRIntermediateImage from 'images/rr_intermediate.png';
import RRAdvancedImage from 'images/rr_advanced.png';

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
  direction?: ResponsiveStyleValue<GridDirection>,
  btnHref?: string,
}> = ({ level, card, children, direction, btnHref }) => {
  return <>
    <Grid xs={12} display='flex' bgcolor={level.bgcolor}>
      <Container maxWidth='lg'>
        <Typography variant='h4' color={level.textcolor} margin={0} paddingY={2}>
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
        paddingY={6}
      >
        <Grid xs={12} md={4}>
          <CflCard
            img={{ alt: card.img.alt, src: card.img.src }}
            text={{ title: card.text.title, content: card.text.content }}
            btn={{ btnText: 'Go to lessons', endIcon: <OpenInNewIcon />, href: btnHref, target: '_blank' }}
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
  const BeginnerBgcolor = '#00a3e0';
  const IntermediateBgcolor = '#f6be00';
  const AdvancedBgcolor = '#e0004d';
  const BeginnerContent = 'Teach your child about problem-solving and logical reasoning as they play. They\'ll explore algorithms, and learn how to create and debug simple programs. Designed for children aged 5-7, but start here if you\'ve never played Rapid Router.';
  const IntermediateContent = 'Children confident with coding can move up to the next challenge — more complex maps and new programming constructs. Designed for children aged 8-11, but anyone can progress here if ready.';
  const AdvancedContent = 'Let\'s get advanced! Learn about repeat loops and selection, variables, and how to create efficient code. Designed for children aged 12-14, but open to all.';

  return <>
    <LevelInfo
      level={{
        difficulty: 'Beginner',
        textcolor: 'White',
        bgcolor: BeginnerBgcolor
      }}
      card={{
        img: { alt: 'RR beginner image', src: RRBeginnerImage },
        text: { title: 'Beginner', content: BeginnerContent }
      }}
      btnHref={process.env.REACT_APP_INDEPENDENT_BEGINNER_HREF}
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
    </LevelInfo>

    <LevelInfo
      level={{
        difficulty: 'Intermediate',
        textcolor: 'Black',
        bgcolor: IntermediateBgcolor
      }}
      card={{
        img: { alt: 'RR intermediate image', src: RRIntermediateImage },
        text: { title: 'Intermediate', content: IntermediateContent }
      }}
      direction='row-reverse'
      btnHref={process.env.REACT_APP_INDEPENDENT_INTERMEDIATE_HREF}
    >
      <Typography variant='h5'>
        Level 17-28
      </Typography>
      <Sessions title='Session 1'>
        Start delivering shopping to lots of different places. It can be easier to plan routes on the paper worksheets before trying on a computer.
      </Sessions>
      <Sessions title='Session 2'>
        Print out the three lesson worksheets. Then, watch the video together to learn about repeat loops. Encourage your child to look for patterns in their code. If they spot a repeated pattern, they can use a repeat loop to make it shorter. Talk about repeated patterns away from the world of computers with poems and exercises.
      </Sessions>
      <Sessions title='Session 3'>
        Get stuck in with more complex loops - even loops inside loops! The printable worksheets help your child plan their code before trying it in Rapid Router. Printable left-right vans can help overcome any confusions between left and right.
      </Sessions>
      <Sessions title='Session 4 & 5'>
        Guide your child through creating their own routes in Rapid Router. Perhaps you can join in and try each other&apos;s routes?
      </Sessions>
    </LevelInfo>

    <LevelInfo
      level={{
        difficulty: 'Advanced',
        textcolor: 'White',
        bgcolor: AdvancedBgcolor
      }}
      card={{
        img: { alt: 'RR advanced image', src: RRAdvancedImage },
        text: { title: 'Advanced', content: AdvancedContent }
      }}
      btnHref={process.env.REACT_APP_INDEPENDENT_ADVANCED_HREF}
    >
      <Typography variant='h5'>
        Levels 29-109
      </Typography>
      <Sessions title='Session 1'>
        Recap earlier levels before looking at repeat loops. Encourage your child to plan ahead on the printable worksheet before writing more complex programs. If they&apos;re unsure about using loops, ask them to write the code without loops and then look for repeating patterns.
      </Sessions>
      <Sessions title='Session 2'>
        A video and printable resources support this lesson, which builds your child&apos;s understanding of loops with a new loop, repeat-until.
      </Sessions>
      <Sessions title='Session 3 & 4'>
        Extra tasks for children who want a challenge! Watch the if...do video to learn about selection statements. Ask your child to explain how their finished program works!
      </Sessions>
      <Sessions title='Extended'>
        Build on everything learned so far with traffic lights, limited blocks, procedures and brain teasers. Older children might even like to start learning to program using the Python language using levels 80 onwards.
      </Sessions>
    </LevelInfo>
  </>;
};

export default LevelInfos;
