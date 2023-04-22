import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Grid2Props,
  Typography,
  useTheme
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import CflCard, { CflCardProps } from 'components/CflCard';
import PageSection from 'components/PageSection';

import RRBeginnerImage from 'images/rr_beginner.png';
import RRIntermediateImage from 'images/rr_intermediate.png';
import RRAdvancedImage from 'images/rr_advanced.png';

const Level: React.FC<Pick<Grid2Props, 'direction'> & {
  banner: {
    difficulty: string,
    color: string,
    bgcolor: string
  },
  cardProps: Omit<CflCardProps, 'buttonProps'> & {
    buttonProps: {
      href: NonNullable<CflCardProps['buttonProps']['href']>
    }
  },
  text: {
    levels: string,
    sessions: Array<{
      ids: number[] | string,
      body: string
    }>
  }
}> = ({ direction, banner, cardProps, text }) => {
  return <>
    <PageSection bgcolor={banner.bgcolor}>
      <Typography
        variant='h4'
        color={banner.color}
        mb={0}
      >
        &lt; {banner.difficulty} &gt;
      </Typography>
    </PageSection>
    <PageSection>
      <Grid
        container
        rowSpacing={{ xs: 2, md: 0 }}
        columnSpacing={{ xs: 0, md: 4 }}
        direction={direction}
      >
        <Grid xs={12} md={4}>
          <CflCard
            mediaProps={cardProps.mediaProps}
            text={cardProps.text}
            buttonProps={{
              children: 'Go to lessons',
              endIcon: <OpenInNewIcon />,
              target: '_blank',
              ...cardProps.buttonProps
            }}
          />
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant='h5'>
            Levels {text.levels}
          </Typography>
          {text.sessions.map((session) => <>
            <Typography variant='h6'>
              {typeof session.ids === 'string'
                ? session.ids
                : 'Session ' + session.ids.join(' & ')
              }
            </Typography>
            <Typography>
              {session.body}
            </Typography>
          </>)}
        </Grid>
      </Grid >
    </PageSection>
  </>;
};

const Levels: React.FC = () => {
  const theme = useTheme();

  return <>
    <Level
      banner={{
        difficulty: 'Beginner',
        color: 'White',
        bgcolor: theme.palette.secondary.main
      }}
      cardProps={{
        mediaProps: { title: 'RR beginner image', image: RRBeginnerImage },
        text: {
          title: 'Beginner',
          content: 'Teach your child about problem-solving and logical reasoning as they play. They\'ll explore algorithms, and learn how to create and debug simple programs. Designed for children aged 5-7, but start here if you\'ve never played Rapid Router.'
        },
        buttonProps: {
          href: process.env.REACT_APP_INDEPENDENT_BEGINNER_HREF as string
        }
      }}
      text={{
        levels: '1-16',
        sessions: [
          {
            ids: [1],
            body: 'Print off the worksheets, and cut them out to play offline. This helps children see that they need to give the computer clear instructions so it can understand how to move the van.'
          },
          {
            ids: [2],
            body: 'Explore Rapid Router online and learn how to play. Print the left-right van on page 6, to help avoid any confusion between left and right. Once a child has understood the basics, they can work on levels 1 to 5.'
          },
          {
            ids: [3],
            body: 'Plan longer routes with more turns to learn how to create more complex algorithms. The direct drive buttons make things a little easier for younger children, or those with learning difficulties while they build confidence.'
          },
          {
            ids: [4, 5],
            body: 'Print off worksheets focusing on efficient routes and planning using levels 13 and 14. Levels 15-16 include routes where there is more than one delivery to make and some complex and tangled routes.'
          }
        ]
      }}
    />
    <Level
      direction='row-reverse'
      banner={{
        difficulty: 'Intermediate',
        color: 'Black',
        bgcolor: theme.palette.tertiary.main
      }}
      cardProps={{
        mediaProps: { title: 'RR intermediate image', image: RRIntermediateImage },
        text: {
          title: 'Intermediate',
          content: 'Children confident with coding can move up to the next challenge — more complex maps and new programming constructs. Designed for children aged 8-11, but anyone can progress here if ready.'
        },
        buttonProps: {
          href: process.env.REACT_APP_INDEPENDENT_INTERMEDIATE_HREF as string
        }
      }}
      text={{
        levels: '17-28',
        sessions: [
          {
            ids: [1],
            body: 'Start delivering shopping to lots of different places. It can be easier to plan routes on the paper worksheets before trying on a computer.'
          },
          {
            ids: [2],
            body: 'Print out the three lesson worksheets. Then, watch the video together to learn about repeat loops. Encourage your child to look for patterns in their code. If they spot a repeated pattern, they can use a repeat loop to make it shorter. Talk about repeated patterns away from the world of computers with poems and exercises.'
          },
          {
            ids: [3],
            body: 'Get stuck in with more complex loops - even loops inside loops! The printable worksheets help your child plan their code before trying it in Rapid Router. Printable left-right vans can help overcome any confusions between left and right.'
          },
          {
            ids: [4, 5],
            body: 'Guide your child through creating their own routes in Rapid Router. Perhaps you can join in and try each other&apos;s routes?'
          }
        ]
      }}
    />
    <Level
      banner={{
        difficulty: 'Advanced',
        color: 'White',
        bgcolor: theme.palette.primary.main
      }}
      cardProps={{
        mediaProps: { title: 'RR advanced image', image: RRAdvancedImage },
        text: {
          title: 'Advanced',
          content: 'Let\'s get advanced! Learn about repeat loops and selection, variables, and how to create efficient code. Designed for children aged 12-14, but open to all.'
        },
        buttonProps: {
          href: process.env.REACT_APP_INDEPENDENT_ADVANCED_HREF as string
        }
      }}
      text={{
        levels: '29-109',
        sessions: [
          {
            ids: [1],
            body: 'Recap earlier levels before looking at repeat loops. Encourage your child to plan ahead on the printable worksheet before writing more complex programs. If they&apos;re unsure about using loops, ask them to write the code without loops and then look for repeating patterns.'
          },
          {
            ids: [2],
            body: 'A video and printable resources support this lesson, which builds your child&apos;s understanding of loops with a new loop, repeat-until.'
          },
          {
            ids: [3, 4],
            body: 'Extra tasks for children who want a challenge! Watch the if...do video to learn about selection statements. Ask your child to explain how their finished program works!'
          },
          {
            ids: 'Extended',
            body: 'Build on everything learned so far with traffic lights, limited blocks, procedures and brain teasers. Older children might even like to start learning to program using the Python language using levels 80 onwards.'
          }
        ]
      }}
    />
  </>;
};

export default Levels;
